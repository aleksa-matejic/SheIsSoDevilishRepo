<?php
session_start();
?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Devilish</title>
    <link href="style/bootstrap.min.css" rel="stylesheet" />
    <link href="style/landing.css" rel="stylesheet" type="text/css" />
    <link href="style/statisticsTable.css" rel="stylesheet" type="text/css" />
</head>
<body>

<header class="jumbotron hero text-center">
    <?php include 'include/menu.php' ?>
</header>

<div class="container section-features">
    <table class="statistics-table">
        <caption><h2>Statistics</h2></caption>
        <tr>
            <td>Player</td>
            <td>Avoided White Clouds</td>
            <td>Avoided Black Clouds</td>
            <td>Avoided Arrows</td>
            <td>Distance</td>
            <td>Score</td>
        </tr>
        <?php
        require 'functions/database_functions.php';
        showStatistics();
        ?>
    </table>
</div>

<footer class="footer text-center">
    Copyright &copy; 2015 Aleksa
</footer>

</body>
</html>
