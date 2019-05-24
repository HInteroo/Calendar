<?php
include '../php/ConnectDB.php'; //Connect to database
date_default_timezone_set('America/New_York');
$MonthAndYear = date('m Y');
$CurrentDate = date('Y-m-d');
$sql = "SELECT * FROM Events";
$result = mysqli_query($conn, $sql);
$rows = mysqli_num_rows($result);
$num = 0;
while($DataofRows = mysqli_fetch_assoc($result)){
  if($CurrentDate <= substr($DataofRows['Start_Event'],0, 10)){
    $num++;
  }
}

if ($num== 0){
    echo "no";
}else{
  echo "$num";

}
 ?>
