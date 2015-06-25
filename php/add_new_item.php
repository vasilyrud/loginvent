<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

/* Gets the desired item id */
$item_names = array();
$prepared_columns = '';
$prepared_names = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$item_names['item_name'] = $_POST['new_item_name'];
	$item_names['formal_name'] = $_POST['new_formal_name'];
	$item_names['octo_name'] = $_POST['new_octo_name'];
}



foreach ($item_names as $key => $value) {
	if ($key == "item_name") {
		$prepared_columns .= $key;
		$prepared_names .= "'".$value."'";
	} else if ($value != "") {
		$prepared_columns .= ", ".$key;
		$prepared_names .= ", "."'".$value."'";
	}
}



$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);




$sql = "
	SELECT 
		COUNT(*) 
	FROM items 
	WHERE LOWER(item_name) = LOWER(?)
";
$stmt = $db->prepare($sql);
$stmt->bindParam(1, $item_names['item_name'], PDO::PARAM_STR);
$stmt->execute();

$status = array();

if($stmt->fetchColumn()) {
	
	$status['status'] = 'item_exists';
	echo json_encode($status);
	exit();
	
} else {
	
	$sth2 = $db->query("
		INSERT INTO items (".$prepared_columns.") 
		VALUES (".$prepared_names.")
	");
	if (!$sth2) {
		print_r($db->errorInfo());
		exit();
	}
	
	$status['status'] = 'item_added';
	echo json_encode($status);
	exit();
	
}

?>