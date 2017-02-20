<?php
/**
 * Created by PhpStorm.
 * User: Aleksa
 * Date: 20-Sep-15
 * Time: 10:05 PM
 */
?>
<h1>She is so devilish</h1>
<div>
    <?php
    if(isset($_SESSION['username']))
    {
        echo '<a class="btn btn-lg btn-default header-btn" href="profile.php">Home</a>';
    }
    elseif(!isset($_SESSION['username']))
    {
        echo '<a class="btn btn-lg btn-default header-btn" href="index.php">Home</a>';
    }
    ?>
    <a class="btn btn-lg btn-default header-btn" href="playGame.php">Play Game</a>
    <a class="btn btn-lg btn-default header-btn" href="statistics.php">Statistics</a>
    <a class="btn btn-lg btn-default header-btn" href="about.php">About Project</a>
    <a class="btn btn-lg btn-default header-btn" href="contact.php">Contact</a>

    <?php
    if(isset($_SESSION['username']))
    {
        echo '<a class="btn btn-lg btn-default header-btn" href="functions/logout.php">Logout</a>';
    }
    ?>
</div>
