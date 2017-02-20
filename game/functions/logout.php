<?php
/**
 * Created by PhpStorm.
 * User: Aleksa
 * Date: 22-Sep-15
 * Time: 11:29 PM
 */

session_start();
if(isset($_SESSION['username']))
{
    session_destroy();
    header('Location: ../index.php?logout');
}
else
{
    header('Location: ../index.php?illegalAction');
}
?>