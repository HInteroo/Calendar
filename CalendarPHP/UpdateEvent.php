<?php
  // if(isset($_POST['id']){
  if ($_POST['id1']) {

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
    if ($_POST['isEdit1'] === "true") {
      $id = $_POST['id1'];
      $Title = $_POST['Title1'];
      $Start = $_POST['Start1'];
      $End = $_POST['End1'];
      $LocationName = $_POST['LocationName1'];
      $LocationAddress = $_POST['LocationAddress1'];
      $Color = $_POST['Color1'];
      $Description = $_POST['Description1'];
      $sql = "UPDATE Events
              SET Title = '$Title', Start_Event = '$Start', End_Event = '$End', LocationTitle = '$LocationName', Location = '$LocationAddress', EventColor = '$Color', Description = '$Description'
              WHERE id = '$id' ";
    }
    else{
      $id = $_POST['id1'];
      $Start = $_POST['Start1'];
      $End = $_POST['End1'];
      $sql = "UPDATE Events
              SET Start_Event = '$Start', End_Event = '$End'
              WHERE id = '$id' ";
      }
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
