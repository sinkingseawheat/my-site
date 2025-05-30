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
  echo json_encode([CSRF_TOKEN_NAME => $csrf_token]); // hex値なのでJSON_UNESCAPED_UNICODEは不要
  exit(0);
}

// メール送信
try {

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
  $token_from_client = $_POST[CSRF_TOKEN_NAME];
  $token_in_server = $_SESSION[CSRF_TOKEN_NAME];
  if(!hash_equals($token_in_server, $token_from_client)){
    throw new Exception('ブラウザとサーバーのトークンが一致しません');
  }
  unset($_SESSION['csrf_token']);

  $body_subject = $_POST['subject'] ?? '';
  $body_email = $_POST['reply_addr'] ?? '';
  $body_page_url = $_POST['page_url'] ?? '';
  $body_content = $_POST['content'] ?? '';

  if(empty(trim($body_email))) {
    throw new Exception('メールアドレスが空です');
  } elseif (!filter_var($body_email, FILTER_VALIDATE_EMAIL)) {
    throw new Exception('メールアドレスが無効です');
  }

  // SMTPの設定
  $mail->SMTPDebug = SMTP::DEBUG_OFF;
  $mail->isSMTP();
  $mail->Host       = $smtp_server;                 // SMTPサーバー
  $mail->SMTPAuth   = true;                              // SMTP認証を有効にする
  $mail->Username   = $smtp_username; 
  $mail->Password   = $smtp_password;
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   // TLS暗号化を有効にする
  $mail->Port       = 587;                               // TLS用のポート番号

  // 文字コード
  $mail->CharSet    = 'UTF-8';                           // 文字エンコード

  // 送信元・宛先
  $mail->setFrom($smtp_username, $smtp_sendername); // 差出人
  $mail->addAddress($smtp_username, $smtp_sendername); // 宛先
  $mail->addReplyTo("{$body_email}", ''); // 返信先
  // $mail->addCC('cc@example.com');                   // CC
  // $mail->addBCC('bcc@example.com');                  // BCC
  // 件名・本文
  $accepted_time = new DateTime('now', new DateTimeZone('Asia/Tokyo'));
  $str_accepted_time = $accepted_time->format('Ymd_Hi');
  $mail->isHTML(true);
  $replaced_body_subject = htmlspecialchars($body_subject);
  $mail->Subject = "{$replaced_body_subject}-初回送信日時:{$str_accepted_time}(日本標準時)";
  $replaced_body_content = str_replace("\r\n", '<br>', htmlspecialchars($body_content));
  $html_body = "以下の相談が入りました<br><br>対象URL: {$body_page_url}<br><br>{$replaced_body_content}<br><br>";
  $html_body_image = '<p>';
  // 画像の処理と埋め込み
  if(isset($_FILES['images']) && !is_array($_FILES['images']['tmp_name'])){
    throw new Exception('このPHPスクリプトのinput[type="file"]のフィールドは配列のみを受け付けています。HTMLのname属性に"[]"は付与されていますか？');
  }
  if (isset($_FILES['images']) && is_array($_FILES['images']['tmp_name'])){
    foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name){
      if ($_FILES['images']['error'][$key] === UPLOAD_ERR_OK) {
        $file_name = $_FILES['images']['name'][$key];
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
        if($original_width > MAX_IMAGE_BOUNDARY_WIDTH){
          // リサイズ処理
          $original_width = imagesx($source_image);
          $original_height = imagesy($source_image);
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
  $mail->AltBody = "{$body_content}"; // HTMLに対応していないメーラー用

  $mail->send();

  $response_data['isOK'] = true;
  $response_data['message'] = ['送信を完了しました。', '改めてこちらから返信いたしますので今しばらくお待ちください。'];

  // メールを送信したらIPアドレスを記録して連続投稿を無効化する
  $log->update();

} catch (Exception $e) {
  // echo "メール送信に失敗しました。エラー: {$mail->ErrorInfo}";
  $response_data['isOK'] = false;
  $response_data['message'] = $e->getMessage();
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