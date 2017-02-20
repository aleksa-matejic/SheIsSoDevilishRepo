<?php
session_start();
if(isset($_SESSION['guest']))
{
    session_destroy();
}
?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Devilish</title>
    <link href="style/bootstrap.min.css" rel="stylesheet" />
    <link href="style/landing.css" rel="stylesheet" type="text/css" />

    <link href='http://fonts.googleapis.com/css?family=Titillium+Web:400,300,600' rel='stylesheet' type='text/css'>
    <!--<link rel="stylesheet" href="style/normalize.css">-->
    <link rel="stylesheet" href="style/style.css">

    <link rel="stylesheet" href="style/game.css">
</head>
<body>

<header class="jumbotron hero text-center">
    <?php include 'include/menu.php' ?>
</header>

<div class="container section-features">
    <?php
    if(isset($_SESSION['username']))
    {
        include 'game.php';
    }
    else if(isset($_SESSION['guest']))
    {
        include 'game.php';
    }
    else
    {
        ?>

        <div class="form">

            <ul class="tab-group">
                <li class="tab active"><a href="#guest">Guest</a></li>
                <li class="tab"><a href="#login">Log In</a></li>
            </ul>

            <div class="tab-content">
                <div id="guest">

                    <form action="functions/setSessionForGame.php" method="post">

                        <div class="field-wrap">
                            <label>
                                Nickname<span class="req">*</span>
                            </label>
                            <input name="guest" type="text" required autocomplete="off" />
                        </div>

                        <button type="submit" class="button button-block" />Play as guest</button>

                    </form>

                </div>

                <div id="login">

                    <form id="login-form" action="functions/setSessionForGame.php" method="post">

                        <div class="field-wrap">
                            <label>
                                Username Or Email Address<span class="req">*</span>
                            </label>
                            <input name="username" type="text" required autocomplete="off" />
                        </div>

                        <div class="field-wrap">
                            <label>
                                Password<span class="req">*</span>
                            </label>
                            <input name="password" type="password" required autocomplete="off" />
                        </div>

                        <p class="forgot"><a href="#">Forgot Password?</a></p>

                        <button type="submit" class="button button-block" />Log In</button>

                    </form>

                </div>

            </div>

        </div>

        <?php
    }
    ?>
</div>

<script src="script/jquery.min.js"></script>
<script src="script/index.js"></script>

<footer class="footer text-center">
    Copyright &copy; 2015 Aleksa
</footer>

</body>

<script src="script/game.js"></script>

</html>
