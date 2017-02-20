<?php
session_start();
// if session exist forward user to profile.php
if(isset($_SESSION['username']))
{
    header('Location: profile.php');
}
?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Devilish</title>
    <link href="style/bootstrap.min.css" rel="stylesheet" />
    <link href="style/landing.css" rel="stylesheet" />

    <link href='http://fonts.googleapis.com/css?family=Titillium+Web:400,300,600' rel='stylesheet' type='text/css'>
    <!--<link rel="stylesheet" href="style/normalize.css">-->
    <link rel="stylesheet" href="style/style.css">
</head>
<body>

<header class="jumbotron hero text-center">
    <?php include 'include/menu.php' ?>
</header>

<div class="container">

    <div class="form">

        <ul class="tab-group">
            <li class="tab active"><a href="#signup">Sign Up</a></li>
            <li class="tab"><a href="#login">Log In</a></li>
        </ul>

        <div class="tab-content">
            <div id="signup">

                <form action="functions/register.php" method="post">

                    <div class="top-row">
                        <div class="field-wrap">
                            <label>
                                First Name<span class="req">*</span>
                            </label>
                            <input name="firstName" type="text" required autocomplete="off" />
                        </div>

                        <div class="field-wrap">
                            <label>
                                Last Name<span class="req">*</span>
                            </label>
                            <input name="lastName" type="text" required autocomplete="off" />
                        </div>
                    </div>

                    <div class="field-wrap">
                        <label>
                            Email Address<span class="req">*</span>
                        </label>
                        <input name="email" type="email" required autocomplete="off" />
                    </div>

                    <div class="field-wrap">
                        <label>
                            Username<span class="req">*</span>
                        </label>
                        <input name="username" type="text" required autocomplete="off" />
                    </div>

                    <div class="field-wrap">
                        <label>
                            Set A Password<span class="req">*</span>
                        </label>
                        <input name="password" type="password" required autocomplete="off" />
                    </div>

                    <button type="submit" class="button button-block" />Get Started</button>

                </form>

            </div>

            <div id="login">

                <form id="login-form" action="functions/login.php" method="post">

                    <div class="field-wrap">
                        <label>
                            Username<span class="req">*</span>
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

</div>

<script src='script/jquery.min.js'></script>
<script src="script/index.js"></script>

<footer class="footer text-center">
    Copyright &copy; 2015 Aleksa
</footer>

</body>
</html>
