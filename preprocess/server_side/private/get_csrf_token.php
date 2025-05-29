<?php

function generateCSRFToken($name_client) {
  $token = bin2hex(random_bytes(32));
  $_SESSION[$name_client] = $token;
  return $token;
}

?>