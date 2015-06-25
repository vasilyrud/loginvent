<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

$status = array();

$item_id = '';
$item_name = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$item_id = $_POST['item_id'];
	$item_name = $_POST['item_name'];
}


$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);



$sth2 = $db->query("
	DELETE FROM items 
	WHERE item_name='".$item_name."' 
");
if (!$sth2) {
	print_r($db->errorInfo());
	exit();
}



$status['status'] = 'deleted_from_db';




function deleteDir($dirPath) {
    if (! is_dir($dirPath)) {
        throw new InvalidArgumentException("$dirPath must be a directory");
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
            self::deleteDir($file);
        } else {
            unlink($file);
        }
    }
    rmdir($dirPath);
}




$dir_path = '../img/items/'.$item_id;




if (file_exists($dir_path)) {
	deleteDir($dir_path);
	$status['status'] = 'deleted_images';
}



echo json_encode($status);


?>