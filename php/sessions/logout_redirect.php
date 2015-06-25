<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	if ($_GET["logout"]=="") {
		session_start();
		session_regenerate_id();
		unset($_SESSION['access_token']);
		unset($_SESSION['priv']);
		$_SESSION['login_time'] = time()-100000;
		header("Location: ../../start.php");
		exit();
	}
}
?>