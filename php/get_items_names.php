<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

/* Queries for the data */
$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);
$sth = $db->query('SELECT id,item_name FROM items');

/* PostgreSQL Error print */
if (!$sth) {
	print_r($db->errorInfo());
	exit();
}

$sth->setFetchMode(PDO::FETCH_ASSOC);

/* Places data into an array */
$all_items = array();
while($row = $sth->fetch()) {
	$all_items[$row['item_name']] = $row['id'];
}

/* Sends array in JSON format */
echo json_encode($all_items); 

?>