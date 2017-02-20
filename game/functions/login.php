<?php
/**
 * Created by PhpStorm.
 * User: Aleksa
 * Date: 21-Sep-15
 * Time: 12:35 AM
 */

session_start();
require 'database_functions.php';
if(user_validation($_POST['username'], $_POST['password']))
{
    echo 'true';

    header('Location: ../index.php?loginSuccessful');
}
else
{
    echo 'false';

    header('Location: ../index.php?loginUnsuccessful');
}
?>