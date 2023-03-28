<?php

use App\Mail\SituationContactMail;

require_once '../class.phpmailer.php';
require_once '../helpers.php';

ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_DEPRECATED);

$company = getInput('C_company');
$name = getInput('C_name');
$telephone = getInput('C_telephone');
$extension = getInput('C_extension');
$cellphone = getInput('C_cellphone');
$email = getInput('C_email');
$comment = getInput('C_comment');

$contact = new SituationContactMail();
$contact->with([
    'from' => '情竟式網站',
    'company_name' => $company,
    'customer_name' => $name,
    'company_telephone' => $telephone,
    'company_extension' => $extension,
    'company_cellphone' => $cellphone,
    'company_email' => $email,
    'comment' => $comment,
]);

header('Content-Type: application/json');
try {
    $mail = getMailer();
    $mail->From = "web-edm-5@olily.com";
    $mail->FromName = "歐立利國際展覽設計集團-顧客通知";
    $mail->Subject = "歐立利國際展覽設計集團-顧客通知-MidiaLabService";
    $mail->Body = $contact->getContent();

    $mail->IsHTML(true);
    $mail->AddAddress('contact@olily.com', 'olilyweb');
    $mail->AddAddress('rita@olily.com', 'olilyweb');
    
    if ($mail->Send()) {
        echo json_encode([
            'success' => 1
        ]);
        exit;
    }
} catch(\Exception $exception) {
    error_log($exception->getMessage());
}

echo json_encode([
    'success' => 0
]);
