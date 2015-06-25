<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/jstest/start_page_v2/conf/db_config.php');

session_start();
$netid = $_SESSION["netid"];
$priv = "none";



// Connect to DB
$db = new PDO('pgsql:dbname='.$DB_NAME.';host='.$DB_HOST.';user='.$DB_USER.';password='.$DB_PASSWORD);


// Query for netid
$sql = "
	SELECT 
		COUNT(*) 
	FROM users 
	WHERE LOWER(netid) = LOWER(?)
";
$stmt = $db->prepare($sql);
$stmt->bindParam(1, $netid, PDO::PARAM_STR);
$stmt->execute();

// If netid exists, then find out privilege and set session[priv] appropriately
if($stmt->fetchColumn()) {
	
	$sth = $db->query("
		SELECT 
			*
		FROM users 
		WHERE netid='".$netid."'
	");
	if (!$sth) {
		print_r($db->errorInfo());
		exit();
	}
	
	$result = $sth->fetch(PDO::FETCH_ASSOC);
	
	$_SESSION['priv'] = $result['priv'];
	
// Else add netid to database and set session[priv] to 'user'
} else {
	
	$sth2 = $db->query("
		INSERT INTO users (netid) 
		VALUES ('".$netid."')
	");
	if (!$sth2) {
		print_r($db->errorInfo());
		exit();
	}
	
	$_SESSION['priv'] = 'user';
	
}





if (isset($_SESSION['access_token'])) {
	if ($_SESSION['priv'] == 'admin' || $_SESSION['priv'] == 'user') {
		session_regenerate_id();
		$_SESSION['login_time'] = time();
		header("Location: ../../index.php");
		exit();
	} else {
		header("Location: logout_redirect.php?logout=");
		exit();
	}
} else {
	header("Location: logout_redirect.php?logout=");
	exit();
}

?>