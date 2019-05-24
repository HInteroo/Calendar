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
  else{
    $Events = array(); //Empty events trying to fetch events in database
    $sql = "SELECT * FROM Events";
    $result=mysqli_query($conn,$sql);
    foreach($result as $row)
    {
     $Events[] = array(
      'id'   => $row["id"],
      'title'   => $row["Title"],
      'start'   => $row["Start_Event"],
      'end'   => $row["End_Event"],
      'location' => $row["Location"],
      'locationTitle' =>$row["LocationTitle"],
      'color' => $row["EventColor"],
      'description' => $row["Description"]
      // 'description' => $row["Description"]
     );
   }
    echo json_encode($Events);
    exit;
  }
?>
