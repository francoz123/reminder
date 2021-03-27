<?php
		if (isset($_POST["submit"])){
		
		$conn = mysqli_connect("localhost","francis","rDY6JcAcmyCOEsJQ","my_database");
		if (!$conn) {
		  die("Connection failed: " . mysqli_connect_error());
		}
		//$sql = "INSERT INTO `reminder` (`id`,`date`, `message`) VALUES ('".$_date."', '".$message."'";
		$sql = "INSERT INTO `reminder` (`date`, `message`) VALUES (?,?)";

		// Check connection
		
		//echo "Connected successfully";
		if($stmt = mysqli_prepare($conn, $sql)){
            // Bind variables to the prepared statement as parameters
			mysqli_stmt_bind_param($stmt, "ss", $_date, $message);
			$_date = $_REQUEST["date"];
			$message = $_REQUEST["details"];
			mysqli_stmt_execute($stmt);
			
		/*if (mysqli_query($conn, $sql)) {
		  echo "Insert successful";
		} else {
		  echo "Error inserting data: " . mysqli_error($conn);
		}*/
		//mysqli_close($conn);
		}
		else{
			echo "ERROR: Could not prepare query: $sql. " . mysqli_error($conn);
		}
		// Close statement
		mysqli_stmt_close($stmt);
		 
		// Close connection
		mysqli_close($conn);
	}
	
	if (isset($_REQUEST["id"])){
		
		$conn = mysqli_connect("localhost","francis","rDY6JcAcmyCOEsJQ","my_database");
		if (!$conn) {
		  die("Connection failed: " . mysqli_connect_error());
		}
		$sql = "DELETE FROM `reminder` WHERE `id` = ?";

		// Check connection
		
		//echo "Connected successfully";
		if($stmt = mysqli_prepare($conn, $sql)){
            // Bind variables to the prepared statement as parameters
			mysqli_stmt_bind_param($stmt, "s", $id);
			$id = $_REQUEST["id"];
			mysqli_stmt_execute($stmt);
			
		}
		else{
			echo "ERROR: Could not delete item:" .mysqli_error($conn);
		}
	// Close statement
	mysqli_stmt_close($stmt);
	 
	// Close connection
	mysqli_close($conn);
	}
	header('Location: calender.php');
?>
