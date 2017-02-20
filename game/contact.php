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

    <!--<link href="style/animate.css" rel="stylesheet" type="text/css" />-->
</head>
<body>

<header class="jumbotron hero text-center">
    <?php include 'include/menu.php' ?>
</header>

<div class="container section-features">
    <h2>Contact</h2>
    <div class="row">
        <div class="col-sm-6 col-md-6 col-lg-6">
            <h3 class="naslov  visible animated zoomIn">Contact informations</h3>
            <address class=" visible animated bounceInLeft">
                <p><i class="fa fa-map-marker"></i><i class="fa fa-minus"></i>Aleksa Matejic</p>
                <p><i class="fa fa-map-marker"></i><i class="fa fa-minus"></i>Stevana Sindjelica 57a, Beograd, Srbija</p>
                <p><i class="fa fa-add1 fa-phone"></i><i class="fa fa-minus"></i>+ 381 64 24 91 898</p>
                <p><i class="fa fa-envelope"></i><i class="fa fa-minus"></i>aljosa.gk@gmail.com</p>
                <p><i class="fa fa-envelope"></i><i class="fa fa-minus"></i><a href="https://www.facebook.com/alexa.matejic" target="_blank">facebook.com/alexa.matejic</a></p>
            </address>
        </div>

        <div class="col-sm-6 col-md-6 col-lg-6">
            <h3 class="naslov  visible animated zoomIn">Send message</h3>
            <div class="contacta visible animated bounceInRight">
                <form id="contact-form" method="post" action="functions/send_form_email.php">
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <input class="form-control " name="name" id="name" placeholder="Name" required="" type="text">
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <input class="form-control" name="email" id="email" placeholder="Email" required="" type="email">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <input class="form-control" name="tel" id="tel" placeholder="Telephone" type="tel">
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <input class="form-control" name="subject" id="subject" placeholder="Subject" required="" type="text">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            <textarea class="form-control" name="message" id="message" required="" placeholder="Message" rows="8"></textarea>
                        </div>
                    </div>
                    <div>
                        <button class="btn" id="submit" type="submit" name="submit" value="Submit">Send</button>
                        <button class="btn" id="reset" type="reset" name="reset" value="Reset">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>

<footer class="footer text-center">
    Copyright &copy; 2015 Aleksa
</footer>

</body>
</html>
