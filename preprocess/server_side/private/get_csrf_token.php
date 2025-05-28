<?php
if(session_status() === PHP_SESSION_NONE){
  session_start();
}

// secret.phpの読み込み
// require_once dirname(__FILE__, 3) . '/server_action_private/secret.php';

function generateCSRFToken() {
  $token = bin2hex(random_bytes(32));
  $_SESSION['csrf_token'] = $token;
  return $token;
}

$csrf_token = generateCSRFToken();

header('Content-Type: application/json');
echo json_encode(['csrf_token' => $csrf_token]); // hex値なのでJSON_UNESCAPED_UNICODEは不要

?>