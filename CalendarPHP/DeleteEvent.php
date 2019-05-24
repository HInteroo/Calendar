<?php
  // if(isset($_POST['id']){
  if ($_POST['CalendarID1']) {

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
    $id = $_POST['CalendarID1'];

    $sql = "DELETE FROM `Events`
            WHERE `Events`.`id` = '$id'";
    // echo $sql;
    if($conn->query($sql)){
			echo "New record has been updated successfully.";
		}
    else {
      echo "error";
      echo $sql . "<br>". $conn->error;
    }
  }
}
?>
