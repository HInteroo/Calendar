<?php
if ($_POST['Title1']) {
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
  else{
    $Title = $_POST['Title1'];
    $Start = $_POST['Start1'];
    $End = $_POST['End1'];
    $LocationName = $_POST['LocationName1'];
    $LocationAddress = $_POST['LocationAddress1'];
    $Color = $_POST['Color1'];
    $Description = $_POST['Description1'];

    $sql = "INSERT INTO Events (id,Title, Start_Event, End_Event,LocationTitle,Location,EventColor,Description)
            VALUES (null,'$Title','$Start','$End','$LocationName','$LocationAddress','$Color','$Description')";
    // echo $sql;
    if($conn->query($sql)){
			echo "New record has been inserted successfully. Redirecting you to homepage.";
		}
    else {
      echo "error";
      echo $sql . "<br>". $conn->error;
    }
  }
}
?>
