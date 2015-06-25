<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

/* Gets the desired item id */
$id = "";
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	$id = $_GET['id'];
}

/* Queries for the data */
$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);
$sth = $db->query("
	SELECT 
		images.id AS image_id,
		images.archive
    FROM items 
	INNER JOIN images 
	ON (items.item_name = images.item_name)
	WHERE items.id=".$id." 
	ORDER BY images.id DESC LIMIT 1
	"); 
$sth2 = $db->query("
	SELECT 
		* 
	FROM items 
	WHERE id=".$id);

/* PostgreSQL Error print */
if (!$sth || !$sth2) {
	print_r($db->errorInfo());
	exit();
}

$sth->setFetchMode(PDO::FETCH_ASSOC);
$sth2->setFetchMode(PDO::FETCH_ASSOC);


/* Places data into an array */
$item_data = array('images'=>array(),'item_data'=>array());
while ($row = $sth->fetch()) {
	$item_data['images'][] = $row;
}
while ($row = $sth2->fetch()) {
	$item_data['item_data'] = $row;
}

/* Sends array in JSON format */
echo json_encode($item_data); 

?>