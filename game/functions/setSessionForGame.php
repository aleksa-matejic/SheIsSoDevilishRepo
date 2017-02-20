<?php
/**
 * Created by PhpStorm.
 * User: Aleksa
 * Date: 24-Sep-15
 * Time: 12:22 AM
 */

session_start();
require 'database_functions.php';
if(isset($_POST['guest']))
{
    $_SESSION['guest'] = $_POST['guest'];
    header('Location: ../playGame.php?guestSuccessful');
}
else if(isset($_POST['username']))
{
    if(user_validation($_POST['username'], $_POST['password']))
    {
        header('Location: ../playGame.php?loginSuccessful');
    }
    else
    {
        header('Location: ../playGame.php?loginUnsuccessful');
    }
}
else
{
    header('Location: ../playGame.php?gameUnsuccessful');
}
?>