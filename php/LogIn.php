<?php
if(isset($_POST["submit"])) {
	$email = filter_input(INPUT_POST, 'email');
	$password = filter_input(INPUT_POST, 'Password');
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
		$select = mysqli_query($conn, "SELECT * FROM Users WHERE Email = '".$email."' AND Password ='".$password."'");
		if(mysqli_num_rows($select)!=0) { //How many rows $select has, 0 if it doesn't exist, 1 if it exist
			if ($value = mysqli_fetch_array($select)){
					session_start();
					echo "Session started!";
					$_SESSION['Email'] = $email;
					$_SESSION['Admin'] = $value['Admin'];
	    			header("location: ../index.php");
		}
	}
		else{
			echo('Email or password is invalid');
		}
		$conn->close();
	}
}
else{
	echo "button not pressed";
}
?>
