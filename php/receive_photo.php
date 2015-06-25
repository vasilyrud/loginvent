<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

$status = array();

$image_data = '';
$item_id = '';
$item_name = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $image_data = base64_decode($_POST['image_data']);
	$item_id = $_POST['item_id'];
	$item_name = $_POST['item_name'];
}


$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);



$sth1 = $db->query("
	INSERT INTO images (item_name) 
	VALUES ('".$item_name."')
");
if (!$sth1) {
	print_r($db->errorInfo());
	exit();
}

$status['status'] = 'image_added';



$sth2 = $db->query("
	SELECT 
		id 
	FROM images 
	WHERE item_name='".$item_name."' 
	ORDER BY id DESC LIMIT 1
");
if (!$sth2) {
	print_r($db->errorInfo());
	exit();
}

$result = $sth2->fetch(PDO::FETCH_ASSOC);


$status['status'] = 'image_added_and_read';








// Path where the image is going to be saved
$dir_path = '../img/items/'.$item_id;
$file_path = $dir_path.'/'.$result['id'].'.png';



if (!file_exists($dir_path)) {
	mkdir($dir_path, 0744);
}
if (file_exists($file_path)) { 
	unlink($file_path); 
}

chmod($dir_path, 0774);

// Write $image_data into the image file
$file = fopen($file_path, 'w');
fwrite($file, $image_data);
fclose($file);


echo json_encode($status);


?>