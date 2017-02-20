<?php
session_start();
if(!isset($_SESSION['username']))
{
    header('Location: index.php?illegalAction');
}
?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Devilish</title>
    <link href="style/bootstrap.min.css" rel="stylesheet" />
    <link href="style/landing.css" rel="stylesheet" type="text/css" />
    <link href="style/statisticsTable.css" rel="stylesheet" />
</head>
<body>

<header class="jumbotron hero text-center">
    <?php include 'include/menu.php' ?>
</header>

<div class="container section-features">
    <table class="statistics-table">
        <caption><h2>Logged in as</h2></caption>
        <tbody>
        <?php
        require 'functions/database_functions.php';
        if(setUserFullSession($_SESSION['username'])){
            echo '<tr>';

            echo '<td>';
            echo $_SESSION['firstName'];
            echo '</td>';

            echo '<td>';
            echo $_SESSION['lastName'];
            echo '</td>';

            echo '<td>';
            echo $_SESSION['email'];
            echo '</td>';

            echo '<td>';
            echo $_SESSION['username'];
            echo '</td>';

            echo '</tr>';
        }
        ?>
        </tbody>
    </table>
</div>

<footer class="footer text-center">
    Copyright &copy; 2015 Aleksa
</footer>

</body>
</html>
