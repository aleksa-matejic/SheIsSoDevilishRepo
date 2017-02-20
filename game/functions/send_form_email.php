<?php
/**
 * Created by PhpStorm.
 * User: Aleksa
 * Date: 26-Sep-15
 * Time: 11:11 PM
 */

if(isset($_POST['email'])) {

    $email_to = "aljosa.gk@gmail.com";
    $subject = "Devilish - ";

    function died($error)
    {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error . "<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }

    // validation expected data exists
    if (!isset($_POST['name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['tel']) ||
        !isset($_POST['subject']) ||
        !isset($_POST['message'])
    ) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $name = $_POST['name']; // required
    $email = $_POST['email']; // required
    $tel = $_POST['email']; // not required
    $subject += $_POST['subject']; // required
    $message = $_POST['message']; // required

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message = "";
    $email_message .= "Name: " . clean_string($name) . "\n";
    $email_message .= "Email: " . clean_string($email) . "\n";
    $email_message .= "Telephone: " . clean_string($tel) . "\n";
    $email_message .= "Subject: " . clean_string($subject) . "\n";
    $email_message .= "Message: " . clean_string($message) . "\n";

    // create email headers
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    mail($email_to, $subject, $email_message, $headers);
    header("Location: ../contact.php?messageSent");
}
?>