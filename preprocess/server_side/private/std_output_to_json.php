<?php
function customErrorHandler($errno, $errstr, $errfile, $errline) {
  // error_reporting() が 0 の場合は、エラー制御演算子（@）によって抑制されているため処理しない
  if (!(error_reporting() & $errno)) {
    return false; // PHPのデフォルトのエラーハンドラに処理を委ねる
  }

  $errorData = [
    'status' => 'error',
    'code' => $errno,
    'message' => $errstr,
    'file' => $errfile,
    'line' => $errline,
    'type' => getErrorType($errno)
  ];

  echo json_encode($errorData, JSON_PRETTY_PRINT);
  exit(); // エラー発生時にスクリプトの実行を停止
}

function customExceptionHandler(Throwable $exception) {
  $errorData = [
    'status' => 'error',
    'code' => $exception->getCode(),
    'message' => $exception->getMessage(),
    'file' => $exception->getFile(),
    'line' => $exception->getLine(),
    'trace' => $exception->getTraceAsString(),
    'type' => 'Exception'
  ];

  echo json_encode($errorData, JSON_PRETTY_PRINT);
  exit(); // 例外発生時にスクリプトの実行を停止
}

/**
 * エラーコードからエラータイプを取得するヘルパー関数
 */
function getErrorType($errno) {
  switch ($errno) {
    case E_ERROR:               return 'Fatal Error';
    case E_WARNING:             return 'Warning';
    case E_PARSE:               return 'Parse Error';
    case E_NOTICE:              return 'Notice';
    case E_CORE_ERROR:          return 'Core Error';
    case E_CORE_WARNING:        return 'Core Warning';
    case E_COMPILE_ERROR:       return 'Compile Error';
    case E_COMPILE_WARNING:     return 'Compile Warning';
    case E_USER_ERROR:          return 'User Error';
    case E_USER_WARNING:        return 'User Warning';
    case E_USER_NOTICE:         return 'User Notice';
    case E_STRICT:              return 'Strict';
    case E_RECOVERABLE_ERROR:   return 'Recoverable Error';
    case E_DEPRECATED:          return 'Deprecated';
    case E_USER_DEPRECATED:     return 'User Deprecated';
    default:                    return 'Unknown Error';
  }
}

// カスタムエラーハンドラと例外ハンドラを設定
set_error_handler("customErrorHandler");
set_exception_handler("customExceptionHandler");
?>