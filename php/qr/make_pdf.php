<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

require("../../lib/php/fpdf/fpdf.php");





/* Queries for the data */
$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);
$sth = $db->query('SELECT * FROM items');

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


//print_r(key($all_items));


class MyPDF extends FPDF {
	function footer() {
		$this->setY(-15);
		$this->setFont("Arial", 'I', 8);
		$this->cell(0, 10, "Page {$this->pageNo()}/{nb}", 0, 0, 'C');
	}
}
$pdf = new MyPDF('P', 'mm', 'Letter');
$pdf->aliasNbPages();
$pdf->addPage();

$pdf->setFont("Courier", 'B', 10);

$itter = 0;
$image_y = 11.5;
$text_y = 14;
foreach ($all_items as $code) {
	$pdf->cell(20, 20, '', 'LTB', 0);

	if ($itter%3 == 0) {
		$pdf->image('../../img/qrcodes/'.$code.'.png', 11.5, $image_y,16.5,16.5);
		$pdf->cell(40, 20, '', 'RTB', 0, 'C');
		$pdf->Text(30, $text_y, substr(array_search($code, $all_items), 0, 18));
		$pdf->Text(30, $text_y+5, substr(array_search($code, $all_items), 18, 18));
		$pdf->Text(30, $text_y+10, substr(array_search($code, $all_items), 36, 18));
	} elseif ($itter%3 == 1) {
		$pdf->image('../../img/qrcodes/'.$code.'.png', 71.5, $image_y,16.5,16.5);
		$pdf->cell(40, 20, '', 'RTB', 0, 'C');
		$pdf->Text(90, $text_y, substr(array_search($code, $all_items), 0, 18));
		$pdf->Text(90, $text_y+5, substr(array_search($code, $all_items), 18, 18));
		$pdf->Text(90, $text_y+10, substr(array_search($code, $all_items), 36, 18));
	} elseif ($itter%3 == 2) {
		$pdf->image('../../img/qrcodes/'.$code.'.png', 131.5, $image_y,16.5,16.5);
		$pdf->cell(40, 20, '', 'RTB', 1, 'C');
		$pdf->Text(150, $text_y, substr(array_search($code, $all_items), 0, 18));
		$pdf->Text(150, $text_y+5, substr(array_search($code, $all_items), 18, 18));
		$pdf->Text(150, $text_y+10, substr(array_search($code, $all_items), 36, 18));
		$GLOBALS['image_y'] += 20;
		$GLOBALS['text_y'] += 20;
	}

	$itter = $itter + 1;

	if ($itter%36 == 0 && $itter != 0) {
		$pdf->AddPage();
		$GLOBALS['image_y'] = 11.5;
		$GLOBALS['text_y'] = 14;
	}
}

$pdf->ln();
$pdf->output('qr_pdf_tester'.'.pdf','I');



?>
