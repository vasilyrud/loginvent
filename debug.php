<?php

$columns = array();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	$columns = $_GET['columns'];
	echo implode(" ",$columns);
}

?>