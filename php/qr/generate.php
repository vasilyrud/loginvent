<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

include('../../lib/php/phpqrcode/qrlib.php');





/* Queries for the data */
$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);
$sth = $db->query('SELECT id FROM items');

/* PostgreSQL Error print */
if (!$sth) {
	print_r($db->errorInfo());
	exit();
}

$sth->setFetchMode(PDO::FETCH_ASSOC);

/* Places data into an array */
$all_items = array();
while($row = $sth->fetch()) {
	$all_items[] = $row['id'];
}






foreach ($all_items as $code) {

	$file_name = $code.'.png';

	$file_path = '../../img/qrcodes/'.$file_name;

	$error_correction = QR_ECLEVEL_H;

	if (!file_exists($file_path)) {
		QRcode::png($code, $file_path, $error_correction, 3, 0);
		echo 'File generated!';
		echo '<hr />';
	} else {
		echo 'File already generated! We can use this cached file to speed up site on common codes!';
		echo '<hr />';
	}

}




?>
