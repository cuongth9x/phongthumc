<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../index.html');
    exit;
}

$name = trim((string)($_POST['ho_ten'] ?? ''));
$phone = trim((string)($_POST['dien_thoai'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$safeReplyTo = str_replace(["\r", "\n"], '', $email);

$backUrl = $_SERVER['HTTP_REFERER'] ?? '../index.html';
$separator = strpos($backUrl, '?') === false ? '?' : '&';

if ($name === '' || $phone === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ' . $backUrl . $separator . 'dangky=thieu-thong-tin');
    exit;
}

$to = 'mcstudio36@gmail.com';
$subject = 'Dang ky thu am tu website';
$message = "Ho va ten: {$name}\n";
$message .= "So dien thoai: {$phone}\n";
$message .= "Email: {$email}\n";
$message .= "Thoi gian: " . date('Y-m-d H:i:s') . "\n";

$headers = [
    'From: website@' . ($_SERVER['HTTP_HOST'] ?? 'localhost'),
    'Reply-To: ' . $safeReplyTo,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($to, $subject, $message, implode("\r\n", $headers));
$status = $sent ? 'thanh-cong' : 'loi-gui-mail';

header('Location: ' . $backUrl . $separator . 'dangky=' . $status);
exit;
