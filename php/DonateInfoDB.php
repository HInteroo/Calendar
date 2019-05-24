<?php
$host = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "LogInDB";

// Create connection
$conn = mysqli_connect($host, $dbusername, $dbpassword, $dbname); //Connect to database called "LogInDB"

// Check connection
if (mysqli_connect_error()){								 //if connection fails ; stop script (connect.php) from happening
  die('Connection Error ('. mysqli_connect_errno() .')' . mysqli_connect_error());
}
$sql = "SELECT *
        FROM DonationInfo a, DonationFund b
        WHERE a.ID= ".$_GET['ID']." AND b.DonationID = ".$_GET['ID']."
      ";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
 ?>
