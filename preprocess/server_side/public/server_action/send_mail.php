<?php
if(session_status() === PHP_SESSION_NONE){
  session_start();
}
// secret.phpの読み込み
require_once dirname(__FILE__, 3) . '/server_action_private/secret.php';

require '../../server_action_private/PHPMailer/src/Exception.php';
require '../../server_action_private/PHPMailer/src/PHPMailer.php';
require '../../server_action_private/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// インスタンスの作成
$mail = new PHPMailer(true);

const LIMIT_CONTINUOUS_POSTING = 15;

try {

  $ip_addr_client = $_SERVER['REMOTE_ADDR'];
  $db_file = '../../server_action_private/memo.sqlite';

  if(filter_var($ip_addr_client, FILTER_VALIDATE_IP) === false){
    throw new Exception('Invalid ip address.');
  }

  $current_time = time();

  $db = new SQLite3($db_file);
  $table_name = 'send_mail_log';
  $db->exec("
    CREATE TABLE IF NOT EXISTS {$table_name}
    (
      ip_addr TEXT PRIMARY KEY,
      date INTEGER
    )
  ;");
  $stmt_get_last_accessed = $db->prepare("
    SELECT date
    FROM {$table_name}
    WHERE
      ip_addr = :ip_addr_client
  ");
  $stmt_get_last_accessed->bindValue(':ip_addr_client', $ip_addr_client);
  $result = $stmt_get_last_accessed->execute();
  $row = $result->fetchArray(SQLITE3_ASSOC);
  $is_row_date_set = is_array($row) && isset($row['date']);
  if(
    $is_row_date_set === true
    && $current_time - $row['date'] < 60 * LIMIT_CONTINUOUS_POSTING
  ){
    throw new Exception('Consecutive posts from the same IP address are restricted. Please wait for ' . LIMIT_CONTINUOUS_POSTING . ' minutes to pass from the last post.');
  }
  if($is_row_date_set === false){
    $stmt_update_date = $db->prepare("
      INSERT INTO {$table_name}
      (ip_addr, date)
      VALUES
      (:ip_addr_client, {$current_time})
    ");
  }else{
    $stmt_update_date = $db->prepare("
      UPDATE {$table_name}
      SET date = {$current_time}
      WHERE
        ip_addr = :ip_addr_client
    ");
  }
  $stmt_update_date->bindValue(':ip_addr_client', $ip_addr_client);
  $stmt_update_date->execute();
  $stmt_update_date->close();

  exit();

  /* if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    throw new Exception('We only support the POST method.');
  } */

  // csrfトークン検証
  if(
    !isset($_POST['csrf_token'])
    || !isset($_SESSION['csrf_token'])
  ){
    throw new Exception('no token.');
  }
  $token_from_client = $_POST['csrf_token'];
  $token_in_server = $_SESSION['csrf_token'];
  if(!hash_equals($token_in_server, $token_from_client)){
    throw new Exception('different value.');
  }
  unset($_SESSION['csrf_token']);

  $body_subject = $_POST['subject'] ?? '';
  $body_content = $_POST['content'] ?? '';
  $body_email = $_POST['replay_addr'] ?? '';

  if(empty(trim($body_email))) {
    throw new Exception('mail address is empty.');
  } elseif (!filter_var($body_email, FILTER_VALIDATE_EMAIL)) {
    throw new Exception('invalid address.');
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
  $mail->isHTML(true);                                  // HTML形式のメールを送信
  $mail->Subject = '【システムメッセージ】相談が入りました';
  $mail->Body    = "以下の相談が入りました\n\n{$body_content}";
  $mail->AltBody = "{$body_content}"; // HTMLに対応していないメーラー用

  $mail->send();

  $response_data['isOK'] = true;
  $response_data['message'] = 'succeed';

  // session情報をserverとclient両方から取り除く
  $_SESSION = array();
  if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
  }
} catch (Exception $e) {
  // echo "メール送信に失敗しました。エラー: {$mail->ErrorInfo}";
  $response_data['isOK'] = false;
  $response_data['message'] = $e->getMessage();
} finally {
  header('Content-Type: application/json');
  echo json_encode($response_data ?? '', JSON_UNESCAPED_UNICODE);
  session_destroy();
  $result->finalize();
  $stmt_get_last_accessed->close();
  $db->close();
  exit();
}

?>