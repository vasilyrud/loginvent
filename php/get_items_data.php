<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

/* Gets the desired order_by */
$order_by = "";
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	$order_by = $_GET['order_by'];
}

/* Queries for the data */
$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);
$sth = $db->query("
	SELECT 
		id, 
		item_name, 
		to_char(was_added, 'YYYY-MM-DD HH24:MI') as was_added, 
		formal_name, 
		octo_name 
	FROM items 
	ORDER BY ".$order_by
);

/* PostgreSQL Error print */
if (!$sth) {
	print_r($db->errorInfo());
	exit();
}

$sth->setFetchMode(PDO::FETCH_ASSOC);

/* Places data into an array */
$all_items = array();
while ($row = $sth->fetch()) {
	$all_items[] = $row;
}

/* Sends array in JSON format */
echo json_encode($all_items); 


?>