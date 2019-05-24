<?php
include '../php/ConnectDB.php'; //Connect to database
date_default_timezone_set('America/New_York'); // Setting correct timezon
$NextMonth = ($_POST['Next'] - $_POST['Previous']);
$CurrentMonth = date("m 0 Y", strtotime($NextMonth."months")); //Numeric representation of current month, with leading zeros	(01 through 12)
$CurrentYear = substr($CurrentMonth, -4);//The current year
$CurrentDate = date('j');  //The current year
$STime = '';               //The time of the event
$ETime = '';               //The time the event ends
$SDateOfEvent = '';         //The data of the event (January 01, 2019). For now, it's empty.
$SDate = '';
$EDate= '';
$Date = '';
$DateDiv = '';
$Time = '';                //The time of the event ($STime - $ETime -> 8:00AM - 3:00PM)
$clickedOnButton = $_POST['Clicked'];
if ($clickedOnButton== 1) {
  $CurrentDate = 1;
}
$sql = "SELECT * FROM Events
      WHERE MONTH (Start_Event) = '$CurrentMonth' AND DAY(Start_Event) >= '$CurrentDate' AND YEAR(Start_Event) = '$CurrentYear'
      ORDER BY Start_Event
      ";
$result = mysqli_query($conn, $sql);
$CurrentMonth = date("F Y", strtotime($NextMonth."months"));
echo '<div id = "Hello">';
echo '<h2 id = "Monthly">'.date('F Y', strtotime($CurrentYear.' '.$CurrentMonth)).'</h2>';

if (mysqli_num_rows($result) > 0){
  while ($row = mysqli_fetch_assoc($result)){
    if ($SDateOfEvent != date( 'F j, Y', strtotime($row['Start_Event']))) { //'F j, Y' = January 01, 2019
      $SDateOfEvent = date( 'F j, Y', strtotime($row['Start_Event'])); //Displays the date of the event
      echo '<h3 id="DateofEvent">
      				'.$SDateOfEvent.'
      			</h3>';
    }
    $STime = date( 'g:iA', strtotime($row['Start_Event'])); //2019-01-31 00:00:00 formats to -> 12:00 AM
    $ETime = date( 'g:iA', strtotime($row['End_Event']));
    $SDate = date( 'j', strtotime($row['Start_Event']));
    $EDate = date( 'j', strtotime($row['End_Event']));
    if ($SDate != $EDate) {
      $Date = $SDate.'-'.$EDate;
      $DateDiv = '<div id="Date">'.$Date.'</div>';
    }
    else {
      $Date = $SDate;
      $DateDiv = '<div id="Date">'.$Date.'</div>';
    }
    if ($STime == '12:00AM' && $ETime == '12:00AM' ) {
      $Time = 'Multiple Days';
    }
    else{
      $Time = $STime.' - '.$ETime;
    }
    echo '
      <div id = "EventInfo" class = "container">
          <div id="Month">
          '.strtoupper(substr($SDateOfEvent,0,3)).'
          '.$DateDiv.'
          </div>
          <div id ="EventTime">'.$Time.'</div>
          <div id = "DescriptionofEvent">
                <div id="Location">'.$row['LocationTitle'].' - '.$row['Location'].'</div>
                <div id="Title">'.$row['Title'].'</div>
                <div id="Description">'.$row['Description'].'</div>
          </div>
      </div>
    ';
    echo "<br>";
    echo '</div>';
  }
}else{
  echo '  <h3 style = "text-align:center; Color:black; margin-bottom:10px;">There are no events available for '.date('F Y', strtotime($CurrentYear.' '.$CurrentMonth)).' :( </h3>
    <h1 style="text-align:center; color:red; margin-bottom:130px;">Sorry!</h1>';
}

 ?>
