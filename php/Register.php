<?php
if(isset($_POST["submit"])){

	$email = filter_input(INPUT_POST, 'Email');
	$password = filter_input(INPUT_POST, 'Password');
	echo "alert('$email')";
	echo "alert('$password')";

	$host = "localhost";
	$dbusername = "root";
	$dbpassword = "";
	$dbname = "LogInDB";

	//creating connection:
	$conn = new mysqli($host, $dbusername, $dbpassword, $dbname); //Connect to database called "LogInDB"

	if (mysqli_connect_error()){								 //if connection fails ; stop script (connect.php) from happening
		die('Connection Error ('. mysqli_connect_errno() .')' . mysqli_connect_error());
	}
	else{
		$sql = "INSERT INTO Users (id, Email, Password, Admin)
		values ('null','$email','$password', 0)"; //0 -> user 1 -> admin
		if($conn->query($sql)){
			echo "New record has been inserted successfully. Redirecting you to homepage.";
			header( "refresh:3; url= ../BEFMain/index.php" );
		}
		else{
			echo "Error: Already Registered!";
			// echo "Error: Already Registered!". $sql . "<br>". $conn->error;
		}
		$conn->close();
	}
}
?>
