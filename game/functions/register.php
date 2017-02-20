<?php
/**
 * Created by PhpStorm.
 * User: Aleksa
 * Date: 22-Sep-15
 * Time: 10:34 PM
 */

session_start();
require 'database_functions.php';
if(user_registration($_POST['firstName'], $_POST['lastName'], $_POST['email'], $_POST['username'], $_POST['password']))
{
    echo 'true';

    header('Location: ../index.php?registrationSuccessful');
}
else
{
    echo 'false';

    header('Location: ../index.php?registrationUnsuccessful');
}
?>