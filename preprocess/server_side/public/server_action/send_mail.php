<?php
if(session_status() === PHP_SESSION_NONE){
  session_start();
}
// secret.phpの読み込み
require_once 'secret.php';

require 'vendor/PHPMailer/src/Exception.php';
require 'vendor/PHPMailer/src/PHPMailer.php';
require 'vendor/PHPMailer/src/SMTP.php';

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;
// use PHPMailer\PHPMailer\Exception;

require_once 'get_csrf_token.php';
require_once 'std_output_to_json.php';

// 定数
const LIMIT_CONTINUOUS_POSTING = 15;
const MAX_IMAGE_BOUNDARY_WIDTH = 600;
const CSRF_TOKEN_NAME = 'csrf_token';

// ResponseはJSONに限定
header('Content-Type: application/json');

// IPアドレスとアクセス日時
class AccessLog {
  private        $db;
  private string $table_name;
  private string $ip_addr_client;
  private        $row_data;
  private int $limit_minutes;
  private bool   $is_date_already_set;

  function __construct(string $db_file, string $table_name, int $limit_minutes){
    $this->db = new SQLite3($db_file);
    $this->table_name = $table_name;
    $this->ip_addr_client = $_SERVER['REMOTE_ADDR'];
    $this->limit_minutes = $limit_minutes;
    if(filter_var($this->ip_addr_client, FILTER_VALIDATE_IP) === false){
      throw new Exception('無効なIPアドレスからのリクエストです');
    }
    $this->db->exec("
      CREATE TABLE IF NOT EXISTS {$this->table_name}
      (
        ip_addr TEXT PRIMARY KEY,
        date INTEGER
      )
    ;");
    $stmt_get_last_accessed = $this->db->prepare("
      SELECT date
      FROM {$this->table_name}
      WHERE
        ip_addr = :ip_addr_client
    ");
    $stmt_get_last_accessed->bindValue(':ip_addr_client', $this->ip_addr_client);
    $result = $stmt_get_last_accessed->execute();
    $this->row_data = $result->fetchArray(SQLITE3_ASSOC);
    $this->is_date_already_set = is_array($this->row_data) && isset($this->row_data['date']);
    $result->finalize();
    $stmt_get_last_accessed->close();
  }

  public function get_is_enable_form(){
    return !($this->is_date_already_set && (time() - $this->row_data['date']) < (60 * $this->limit_minutes));
  }

  public function update(){
    $current_time = time();
    if($this->is_date_already_set === false){
      $stmt_update_date = $this->db->prepare("
        INSERT INTO {$this->table_name}
        (ip_addr, date)
        VALUES
        (:ip_addr_client, {$current_time})
      ");
    }else{
      $stmt_update_date = $this->db->prepare("
        UPDATE {$this->table_name}
        SET date = {$current_time}
        WHERE
          ip_addr = :ip_addr_client
      ");
    }
    $stmt_update_date->bindValue(':ip_addr_client', $this->ip_addr_client);
    $stmt_update_date->execute();
    $stmt_update_date->close();
  }

  function __destruct(){
    $this->db->close();
  }
}

$mail = new PHPMailer\PHPMailer\PHPMailer(true);
$log = new AccessLog('../../server_action_private/memo.sqlite', 'send_mail_log', LIMIT_CONTINUOUS_POSTING);

// CSRFトークン発行
if($_SERVER['REQUEST_METHOD'] === 'GET'){
  $csrf_token = generateCSRFToken(CSRF_TOKEN_NAME);
  echo json_encode([
    CSRF_TOKEN_NAME => $csrf_token,  // hex値なのでJSON_UNESCAPED_UNICODEは不要
    'is_enable' => $log->get_is_enable_form(),
    'limit_minutes' => LIMIT_CONTINUOUS_POSTING,
  ]);
  exit(0);
}

// メール送信
try {
  // PUT, DELETEなどは弾く
  if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    throw new Exception('データはPOSTで送信してください');
  }
  $ip_addr_client = $_SERVER['REMOTE_ADDR'];
  $db_file = '../../server_action_private/memo.sqlite';
  if(filter_var($ip_addr_client, FILTER_VALIDATE_IP) === false){
    throw new Exception('無効なIPアドレスからのリクエストです');
  }
  if($log->get_is_enable_form() === false){
    throw new Exception('同じIPアドレスからの連続投稿は無効化しています. お手数ですが前回の送信から約' . LIMIT_CONTINUOUS_POSTING . '分ほど経ってから送信お願いします。');
  }
  // csrfトークン検証
  if(
    !isset($_POST[CSRF_TOKEN_NAME])
    || !isset($_SESSION[CSRF_TOKEN_NAME])
  ){
    throw new Exception('トークンが設定されていません');
  }
  if(!hash_equals($_POST[CSRF_TOKEN_NAME], $_SESSION[CSRF_TOKEN_NAME])){
    throw new Exception('ブラウザとサーバーのトークンが一致しません');
  }
  unset($_SESSION['csrf_token']);

  // 送信メール作成
  $body_subject = $_POST['subject'] ?? '';
  $body_email = $_POST['reply_addr'] ?? '';
  $body_page_url = $_POST['page_url'] ?? '';
  $body_content = $_POST['content'] ?? '';
  if(empty(trim($body_email))) {
    throw new Exception('メールアドレスが空です');
  } elseif (!filter_var($body_email, FILTER_VALIDATE_EMAIL)) {
    throw new Exception('メールアドレスが無効です');
  }

  $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_OFF;
  $mail->isSMTP();
  $mail->Host       = $smtp_server;
  $mail->SMTPAuth   = true;
  $mail->Username   = $smtp_user_address; 
  $mail->Password   = $smtp_password;
  $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;
  $mail->CharSet    = 'UTF-8';
  
  $mail->setFrom($mail_from_user_address, $mail_sender_name); // 差出人
  $mail->addAddress($mail_from_user_address, $mail_sender_name); // 宛先
  $mail->addReplyTo($body_email, '');
  $mail->isHTML(true);

  $accepted_time = new DateTime('now', new DateTimeZone('Asia/Tokyo'));
  $str_accepted_time = $accepted_time->format('Y/m/d H:i');
  $replaced_body_subject = htmlspecialchars($body_subject);
  $mail->Subject = "{$replaced_body_subject}-初回送信日時_{$str_accepted_time}(日本標準時)";

  $replaced_body_content = str_replace("\r\n", '<br>', htmlspecialchars($body_content));
  $html_body = "以下の相談が入りました<br><br>対象URL: {$body_page_url}<br><br>{$replaced_body_content}<br><br>";
  $html_body_image = '<p>';
  // 画像の処理と埋め込み
  if(isset($_FILES['images']) && !is_array($_FILES['images']['tmp_name'])){
    throw new Exception('このPHPスクリプトのinput[type="file"]のフィールドは配列のみを受け付けています。HTMLのname属性に"[]"は付与されていますか？');
  }
  if(isset($_FILES['images']) && is_array($_FILES['images']['tmp_name'])){
    foreach($_FILES['images']['tmp_name'] as $key => $tmp_name){
      if($_FILES['images']['error'][$key] === UPLOAD_ERR_OK) {
        $file_name = $_FILES['images']['name'][$key];
        if($_FILES['images']['size'][$key] > 6 * 1024 * 1024){
          throw new Exception($file_name . 'のファイルサイズが6MBより大きいです。画像を圧縮してください。');
        }
        // $file_type = $_FILES['images']['type'][$key];
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        if(!$finfo){
          throw new Exception($file_name . 'のMIMEタイプが取得できませんでした');
        }
        $file_type = $finfo->file($tmp_name);
        $source_image = null;
        switch ($file_type) {
          case 'image/jpeg':
            $source_image = imagecreatefromjpeg($tmp_name);
            break;
          case 'image/png':
            $source_image = imagecreatefrompng($tmp_name);
            break;
          default:
            throw new Exception("image/pngとimage/jpegのみサポートしています: " . $file_type);
        }
        if (!$source_image) {
          throw new Exception("画像リソースの作成に失敗しました。");
        }

        $original_width = imagesx($source_image);
        $original_height = imagesy($source_image);
        if($original_width > MAX_IMAGE_BOUNDARY_WIDTH){
          // リサイズ処理
          $aspect_ratio = $original_width / $original_height;
          $new_width = MAX_IMAGE_BOUNDARY_WIDTH;
          $new_height = (int)($new_width / $aspect_ratio);
          $resized_image = imagecreatetruecolor($new_width, $new_height);
          if ($file_type == 'image/png'){
            // 透過処理
            imagealphablending($resized_image, false);
            imagesavealpha($resized_image, true);
            $transparent = imagecolorallocatealpha($resized_image, 255, 255, 255, 127);
            imagefilledrectangle($resized_image, 0, 0, $new_width, $new_height, $transparent);
          }
          imagecopyresampled($resized_image, $source_image,
            0, 0, 0, 0,
            $new_width, $new_height, $original_width, $original_height);
          // 画像の生データを取得 - 開始
          ob_start();
          switch ($file_type) {
            case 'image/jpeg':
              imagejpeg($resized_image, null, 90);
              break;
            case 'image/png':
              imagepng($resized_image);
              break;
            default:
              throw new Exception("image/pngとimage/jpegのみサポートしています: " . $file_type);
          }
          $image_data = ob_get_clean();
          // 画像の生データを取得 - 終了
          $cid = 'image_' . md5($file_name . time() . $key);
          $mail->addStringEmbeddedImage($image_data, $cid, $file_name, 'base64', $file_type);
        }else{
          // リサイズ不要の場合
          $cid = 'image_' . md5($file_name . time() . $key);
          $mail->addEmbeddedImage($tmp_name, $cid, $file_name, 'base64', $file_type);
        }
        $html_body_image .= '<img src="cid:' . $cid . '" alt="' . htmlspecialchars($file_name) . '" style="max-width:600px; height:auto;">';
      } else {
        throw new Exception("ファイルのアップロードエラーが発生しました: " . $_FILES['images']['error'][$key]);
      }
    }
    $html_body_image .= '</p>';
  }
  $mail->Body = $html_body . $html_body_image;
  $mail->AltBody = "{$body_content}";

  $mail->send();

  $confirm_mail_subject = '【自動送信メール】相談フォームの内容を確認中です。数日以内には返信するようにいたします。';

  $response_data['isOK'] = true;
  $response_data['message'] = ['送信を完了しました。改めてこちらから返信いたしますので今しばらくお待ちください。', "「{$confirm_mail_subject}」という件名のメールが自動送信されます。数分待っても送信されない場合は迷惑メールに隔離されていないか確認お願いします。"];

  $is_mail_sent = true;

  // メールを送信したらIPアドレスを記録して連続投稿を無効化する
  $log->update();

  // 確認メール
  $mail_confirm = new PHPMailer\PHPMailer\PHPMailer(true);
  $mail_confirm->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_OFF;
  $mail_confirm->isSMTP();
  $mail_confirm->Host       = $smtp_server;
  $mail_confirm->SMTPAuth   = true;
  $mail_confirm->Username   = $smtp_user_address; 
  $mail_confirm->Password   = $smtp_password;
  $mail_confirm->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
  $mail_confirm->Port       = 587;
  $mail_confirm->CharSet    = 'UTF-8';
  $mail_confirm->setFrom($mail_from_info_address, $mail_sender_name); // 差出人
  $mail_confirm->addAddress($body_email, ''); // 宛先
  $mail_confirm->addReplyTo($mail_from_info_address, $mail_sender_name);
  $mail_confirm->isHTML(true);
  $mail_confirm->Subject = $confirm_mail_subject;
  $mail_confirm->Body =
  'こちらは相談フォームに入力されたメールアドレスへの自動送信メールです。<br>'
  . '<b>心当たりのない場合はご迷惑をおかけしますが、無視するか、フィルターで除外お願いします。</b><br>'
  . 'こちらとしては避けてもらいたいですが、フィルターでの除外設定方法が不明な場合で、何度も送られてくる場合は、お手数ですが迷惑メールとして扱っても構いません。<br><br>'
  . '--------以下は相談フォームに記入いただいた前提での内容となります。--------<br><br>'
  . 'お問い合わせありがとうございます。相談フォームの内容を確認中です。数日以内には返信するようにいたしますので、今しばらくお待ちください。<br>'
  . '相談フォームに記入いただいた件名で改めてメールを送信します。<br>'
  . '書き漏れた条件などの追加情報はそのメールにご返信ください。<b>このメールでは返信しないようにお願いします。</b><br>'
  . '※ 数日経ってもメールが届かない場合のみ、お手数ですがこのメールに返信をお願いします。<br>'
  . '※ フォームの悪用防止のため、相談フォームへの入力内容やURLなどはこのメールに記載しておりません。ご了承ください。'
  ;
  
  $mail_confirm->send();

} catch (Exception $e) {
  if(isset($is_mail_sent) && $is_mail_sent === true){
    // メール送信完了後のエラーの場合はここ。このプログラムは走らない想定。
    error_log('The email was sent successfully, but then an error occurred.' . $e->getMessage());
    $response_data['isOK'] = true;
  }else{
    $response_data['message'] = $e->getMessage();
    $response_data['isOK'] = false;
  }
} finally {
  // レスポンス返却
  echo json_encode($response_data ?? '', JSON_UNESCAPED_UNICODE);

  // session情報をserverとclient両方から取り除く
  $_SESSION = array();
  if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
  }
  session_destroy();
  exit(0);
}

?>