<?php
	$_date = $_REQUEST["date"];
	$message = $_REQUEST["details"];
	echo $_date;
	echo $message;

?>
INSERT INTO `reminder` (`id`, `date`, `message`, `time`) VALUES ('1', 'Wed Feb 24, 2021', 'hi how are you', 'current_timestamp(6).000000');