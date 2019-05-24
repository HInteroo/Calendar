<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>The Better Eduation Foundation</title>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">

    <!-- FontAwesome CSS -->
    <link rel="stylesheet" href="css/font-awesome.min.css">

    <!-- ElegantFonts CSS -->
    <link rel="stylesheet" href="css/elegant-fonts.css">

    <!-- themify-icons CSS -->
    <link rel="stylesheet" href="css/themify-icons.css">

    <!-- Swiper CSS -->
    <link rel="stylesheet" href="css/swiper.min.css">

    <!-- Styles -->
    <link rel="stylesheet" href="style.css">

    <link rel="stylesheet" href="css/fullcalendar.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.js"></script>

</head>
<body class="single-page causes-page">
    <header class="site-header">
    <div class="top-header-bar">
        <div class="container">
            <div class="row flex-wrap justify-content-center justify-content-lg-between align-items-lg-center">
                <div class="col-12 col-lg-8 d-none d-md-flex flex-wrap justify-content-center justify-content-lg-start mb-3 mb-lg-0">
                    <div class="header-bar-email">
                        EMAIL: <a href="#">bettereducationfoundation@gmail.com</a>
                      </div><!-- .header-bar-email -->

                    <div class="header-bar-text">
                        <p>PHONE: <span>+24 3772 120 091 / +56452 4567</span></p>
                    </div><!-- .header-bar-text -->
                </div><!-- .col -->

                <div class="col-12 col-lg-4 d-flex flex-wrap justify-content-center justify-content-lg-end align-items-center">
                    <div class="donate-btn">
                        <a href="#">Donate Now</a>
                    </div><!-- .donate-btn -->
                </div><!-- .col -->
            </div><!-- .row -->
        </div><!-- .container -->
    </div><!-- .top-header-bar -->
    <div class="nav-bar">
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex flex-wrap justify-content-between align-items-center">
                    <div class="site-branding d-flex align-items-center">
                        <a class="d-block" href="index.html" rel="home"><img class="d-block" src="images/logo.png" alt="logo"></a>
                    </div><!-- .site-branding -->

                    <nav class="site-navigation d-flex justify-content-end align-items-center">
                        <ul class="d-flex flex-column flex-lg-row justify-content-lg-end align-content-center">
                            <li class="current-menu-item"><a href="index.php">Home</a></li>
                            <li><a href="about.php">About us</a></li>
                            <li><a href="causes.php">Causes</a></li>
                            <li><a href="portfolio.php">Gallery</a></li>
                            <li><a href="contact.php">Contact</a></li>
                            <li><a href="Events.php">Event</a></li>
                            <?php
                            if(isset($_SESSION['Email'])){
                              echo '<li><a href="Calendar.html">Calendar</a></li>';
                            }
                            ?>
                        </ul>
                    </nav><!-- .site-navigation -->

                    <div class="hamburger-menu d-lg-none">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div><!-- .hamburger-menu -->
                </div><!-- .col -->
            </div><!-- .row -->
        </div><!-- .container -->
    </div><!-- .nav-bar -->
</header><!-- .site-header -->

    <div class="page-header" style="margin:0;">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 >Events & Meetups</h1>
                </div><!-- .col -->
            </div><!-- .row -->
        </div><!-- .container -->
    </div><!-- .page-header -->

      <div id="Events">
            <h1 style="text-align: center;">Events and Meetups</h1>
            <h3 style="text-align: center;"> There are currently <strong id= "UpcomingEvents" style = 'Color:#194F4F;'> </strong> upcoming events</h3>
            <br>
            <button id = "EventBtn">See Events!</button>
            <div id="MonthBtnsDiv" style="visibility:hidden">
                    <button id = "Previous"><</button>
                    <button id = "Next">></button>
                    <button id = "Today">Today</button>
                    <button id = "Calendar">View Calendar</button>
            </div>
        </div>

    <div class = "modal bg-modal">
      <div class = "modal-content" id="LogIn">
          <h3>Log In</h3>
          <form class="LogInForm" name = "LogInForm" action = "php/LogIn.php" method="post">
            <div id="EmailAndPassword">
              <label>Email</label>
              <br>
              <input
                type="text"
                name = "email"
                required
                placeholder="Your Email Address">
              <br>
              <label>Password</label>
              <br>
              <input
                type="PassWord"
                name ="Password"
                required
                placeholder="Your Password">
            </div>
            <label id="RememberMe"><input type="checkbox"> Remember me</label>
            <div id="ValidationError"></div>
            <div class="SubmitAndSave">
              <button type="button" class="Close"> Close </button>
              <button type="submit" name = "submit"class="SubmitBtn"> Log In </button>
            </div>
          </form>
      </div>
    </div>

    <div class = "modal Options">														<!--The background and container of the event's information-->
			<div class = "modal-content" id ="ClickedEventModal">	<!--The hidden modal that pops up whenever you click on an event that has already been created. Shows it's details-->
					<div class="Hide">+</div>
					<div class="ClickedEvent">
						<div class="Square"></div>
						<p class ='Title'></p>
						<p class ='Date'></p>
						<div class="glyphicon glyphicon-map-marker LocationGylph"></div>
						<a class ='LocationTitle' href="http://maps.google.com/?q=" target="_blank"></a>
						<p class ='Location'></p>
						<div class="glyphicon glyphicon-align-justify DescriptionGylph"></div>
						<p class ='Description'></p>
					</div>
			</div>
		</div>

    <div class = "modal bg-modal">
      <div class = "modal-content" id="LogIn">
          <h3>Log In</h3>
          <form class="LogInForm" name = "LogInForm" action = "php/LogIn.php" method="post">
            <div id="EmailAndPassword">
              <label>Email</label>
              <br>
              <input
                type="text"
                name = "email"
                required
                placeholder="Your Email Address">
              <br>
              <label>Password</label>
              <br>
              <input
                type="PassWord"
                name ="Password"
                required
                placeholder="Your Password">
            </div>
            <label id="RememberMe"><input type="checkbox"> Remember me</label>
            <div id="ValidationError"></div>
            <div class="SubmitAndSave">
              <button type="button" class="Close"> Close </button>
              <button type="submit" name = "submit"class="SubmitBtn"> Log In </button>
            </div>
          </form>
      </div>
    </div>

    <footer class="site-footer">
        <div class="footer-widgets">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="foot-about">
                            <h2><a class="foot-logo" href="#"><img src="images/foot-logo.png" alt=""></a></h2>

                            <p>B.E.F is a nonprofit organization that presents opportunities to women and children by providing education and resources to succeed.</p>

                            <ul class="d-flex flex-wrap align-items-center">
                                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                            </ul>
                        </div><!-- .foot-about -->
                    </div><!-- .col -->

                    <div class="col-12 col-md-6 col-lg-3 mt-5 mt-md-0">
                        <div class="foot-contact">
                            <h2>Contact</h2>

                            <ul>
                                <li><i class="fa fa-phone"></i><span>number</span></li>
                                <li><i class="fa fa-envelope"></i><span>bettereducationfoundation@gmail.com</span></li>
                                <li><i class="fa fa-map-marker"></i><span>New York, NY</span></li>
                            </ul>
                            <div style=" decoration:none;">
                            <a id="LogInOrReg">Log In</a>
                          </div>
                        </div><!-- .foot-contact -->

                    </div><!-- .col -->

                </div><!-- .row -->
            </div><!-- .container -->
        </div><!-- .footer-widgets -->

        <div class="footer-bar">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <p class="m-0"><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | THE BETTER EDUCATION FOUNDATION IS A REGISTERED 501(C)(3) |This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
                    </div><!-- .col-12 -->
                </div><!-- .row -->
            </div><!-- .container -->
        </div><!-- .footer-bar -->
    </footer><!-- .site-footer -->
    <script type='text/javascript' src='js/jquery.js'></script>
    <script type='text/javascript' src='js/jquery.collapsible.min.js'></script>
    <script type='text/javascript' src='js/swiper.min.js'></script>
    <script type='text/javascript' src='js/jquery.countdown.min.js'></script>
    <script type='text/javascript' src='js/circle-progress.min.js'></script>
    <script type='text/javascript' src='js/jquery.countTo.min.js'></script>
    <script type='text/javascript' src='js/jquery.barfiller.js'></script>
    <script type='text/javascript' src='js/custom.js'></script>
    <script type='text/javascript' src='js/jqueryFunctions.js'></script>

</body>
</html>
