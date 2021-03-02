<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Calender</title>
  <link rel="stylesheet" href="calender.css">
  <link rel="stylesheet" href="modal.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
	$conn = mysqli_connect("localhost","francis","rDY6JcAcmyCOEsJQ","my_database");
	$sql = "SELECT * FROM reminder";
	$query = mysqli_query($conn, $sql);
	if ($query) {
		//echo "Select successful";
		$i = 0;
		echo "<script>";
		echo "var items = new Array();\n";
		
		while ($row = mysqli_fetch_array($query, MYSQLI_BOTH)){
			echo "items[".$i."]=[".$row["id"].",\"".$row["date"]."\",\"".$row["message"]."\"];\n";
			$i++;
		}
		echo "</script>";
		
		} else {
		  echo "Error selecting data: " . mysqli_error($conn);
		  mysqli_close($conn); 
		}
	
	
?>
</head>
<body>
	<div>
		<h1 id="monthandyear"></h1>
	</div>
  
	<section = class="content">
		<div class="body">
			<div class="content-wrapper">
				<div class="side-bar">
					<a href="#">Add +</a>
					<a href="#">View all</a>
				</div>
				<div class="calender">
			
					<div class="selector">
						<form class="form-inline">
							<label class="lead mr-2 ml-2" for="month">Jump To: </label>
							<select class="form-control col-sm-4" name="month" id="month" onchange="jump()">
								<option value=0>Jan</option>
								<option value=1>Feb</option>
								<option value=2>Mar</option>
								<option value=3>Apr</option>
								<option value=4>May</option>
								<option value=5>Jun</option>
								<option value=6>Jul</option>
								<option value=7>Aug</option>
								<option value=8>Sep</option>
								<option value=9>Oct</option>
								<option value=10>Nov</option>
								<option value=11>Dec</option>
							</select>


							<label for="year"></label><select class="form-control col-sm-4" name="year" id="year" onchange="jump()">
								<option value=1990>1990</option>
								<option value=1991>1991</option>
								<option value=1992>1992</option>
								<option value=1993>1993</option>
								<option value=1994>1994</option>
								<option value=1995>1995</option>
								<option value=1996>1996</option>
								<option value=1997>1997</option>
								<option value=1998>1998</option>
								<option value=1999>1999</option>
								<option value=2000>2000</option>
								<option value=2001>2001</option>
								<option value=2002>2002</option>
								<option value=2003>2003</option>
								<option value=2004>2004</option>
								<option value=2005>2005</option>
								<option value=2006>2006</option>
								<option value=2007>2007</option>
								<option value=2008>2008</option>
								<option value=2009>2009</option>
								<option value=2010>2010</option>
								<option value=2011>2011</option>
								<option value=2012>2012</option>
								<option value=2013>2013</option>
								<option value=2014>2014</option>
								<option value=2015>2015</option>
								<option value=2016>2016</option>
								<option value=2017>2017</option>
								<option value=2018>2018</option>
								<option value=2019>2019</option>
								<option value=2020>2020</option>
								<option value=2021>2021</option>
								<option value=2022>2022</option>
								<option value=2023>2023</option>
								<option value=2024>2024</option>
								<option value=2025>2025</option>
								<option value=2026>2026</option>
								<option value=2027>2027</option>
								<option value=2028>2028</option>
								<option value=2029>2029</option>
								<option value=2030>2030</option>
							</select>
						</form>
					</div>

					<div class="cal" id="cal">

					</div>

					<div class="action">
						<button class="btn btn-outline-primary col-sm-6" id="previous" onclick="previous()">Previous</button>
						<button class="btn btn-outline-primary col-sm-6" id="today" onclick="today()">Today</button>
						<button class="btn btn-outline-primary col-sm-6" id="next" onclick="next()">Next</button>
					</div>
								
				</div>
				
			</div>
			<div class="upcomming" id="uc">
				<h4 id="display-h4">Selected item details</h4>
				<div id="display-div" class="display-div">
				</div>
			</div>
		</div>
	</section>
<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
	<div class="modal-content">
		<button class="close" id="close">&times;</button>
		<h3 id="form-h3"></h3>
		<form action="calender.php" method="post">	
			<input type="hidden" name="date" id="date" value="">

			<label for="details" >Enter details:</label><br>
			<textarea id="details" name="details" rows="10" cols="50" >  </textarea><br>
			<input type="submit" id="submit" name="submit" value="Save">
		</form>
    
	</div>

</div>

</body>
<script src="modal.js"></script>
<script src="calender.js"></script>
</html>