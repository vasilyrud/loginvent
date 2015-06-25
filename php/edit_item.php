<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

/* Gets the desired item id */
$col = '';
$old_val = '';
$new_val = '';
$item_id = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$col = $_POST['column'];
	$old_val = $_POST['old_value'];
	$new_val = $_POST['new_value'];
	$item_id = $_POST['item_id'];
}


$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);


$sth = $db->query("
	UPDATE items 
	SET ".$col."='".$new_val."' 
	WHERE id='".$item_id."'
");


if (!$sth) {
	print_r($db->errorInfo());
	exit();
}


$status['status'] = 'item_edited';
echo json_encode($status);
exit();


?>