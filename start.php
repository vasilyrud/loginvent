<?php
session_start();

set_include_path("lib/php/google-api-php-client/src/" . PATH_SEPARATOR . get_include_path());
require_once 'lib/php/google-api-php-client/src/Google/Client.php';

$client_id = ''; // Example: 123456789-abd38492sdfg234.apps.googleusercontent.com
$client_secret = ''; // Example: SDOW1239DEOF2309
$redirect_uri = ''; // Full URL to start.php

$client = new Google_Client();
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->setScopes('email');
// Currently detects NYU students and redirects to NYU Shibboleth:
if (isset($_SESSION['netid'])) {
	$client->setLoginHint($_SESSION['netid'].'@nyu.edu');
} else {
	$client->setLoginHint('john.sexton@nyu.edu');
}


/* Logout */
if (isset($_REQUEST['logout'])) {
  unset($_SESSION['access_token']);
}

/* If we have a code back from the OAuth 2.0 flow, we need to exchange that with the authenticate() function. We store the resultant access token bundle in the session, and redirect to ourself. */
if (isset($_GET['code'])) {
  $client->authenticate($_GET['code']);
  $_SESSION['access_token'] = $client->getAccessToken();
  $redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
  header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
}

/* If we have an access token, we can make requests, else we generate an authentication URL. */
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
  $client->setAccessToken($_SESSION['access_token']);
} else {
  $authUrl = $client->createAuthUrl();
}

/* If we're signed in we can go ahead and retrieve the ID token, which is part of the bundle of data that is exchange in the authenticate step - we only need to do a network call if we have to retrieve the Google certificate to verify it, and that can be cached. */
if ($client->getAccessToken()) {
  $_SESSION['access_token'] = $client->getAccessToken();
  $token_data = $client->verifyIdToken()->getAttributes();
  $_SESSION['netid'] = explode('@', $token_data['payload']['email'])[0];
  header("Location: php/sessions/login_redirect.php");
  exit();
}


?>




<!DOCTYPE html>
<html lang="en" style="height:100%;">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lab Inventory - Login</title>

	<link rel="shortcut icon" href="img/favicon.ico">
	<link rel="stylesheet" href="lib/js/jquery-ui/jquery-ui.css" />
    <link href="bootstrap_src/dist/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/main.css" />
	<style>
	/*** Font Stuff ***/
	@font-face {
		font-family: 'oswald_light';
		src: url('fonts/oswald-light/oswald-light-webfont.eot');
		src: url('fonts/oswald-light/oswald-light-webfont.eot?#iefix') format('embedded-opentype'),
		url('fonts/oswald-light/oswald-light-webfont.woff') format('woff'),
		url('fonts/oswald-light/oswald-light-webfont.ttf') format('truetype'),
		url('fonts/oswald-light/oswald-light-webfont.svg#/fonts/oswald-light/oswald-light-webfont') format('svg');
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: 'oswald_regular';
		src: url('fonts/oswald-regular/oswald-regular-webfont.eot');
		src: url('fonts/oswald-regular/oswald-regular-webfont.eot?#iefix') format('embedded-opentype'),
		url('fonts/oswald-regular/oswald-regular-webfont.woff') format('woff'),
		url('fonts/oswald-regular/oswald-regular-webfont.ttf') format('truetype'),
		url('fonts/oswald-regular/oswald-regular-webfont.svg#/fonts/oswald-regular/oswald-regular-webfont') format('svg');
		font-weight: normal;
		font-style: normal;
	}
	* {
		font-family: 'oswald_regular', sans-serif;
		/*font-size:20px;*/
		text-transform:uppercase;
	}

	body {
		padding-top:112px;
	}
	#main {
		padding-left:70px;
	}

	</style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body style="padding-top:0px;height:100%;">

	<!------------------------
	----- Left Box -----------
	------------------------->
	<div id="left" style="box-shadow:0 0 0 0 rgba(0,0,0,0);">
		<!--<button type="button" class="btn btn-success btn-sm" style="position:absolute;height:50px;width:50px;">
			<span class="glyphicon glyphicon-cog"></span>
		</button>-->
		<div id="left_div1">
			<span class="left_text_shadow"></span>
		</div>
	</div>
	<!----------------------->


	<!------------------------
	----- Navigation Box -----
	------------------------->

	<!----------------------->


	<!------------------------
	----- Content Box --------
	------------------------->
    <div class="container" id="main" style="padding-left:70px;">
		<div class="row">
			<div class="col-lg-12" style="">
			<img src="img/log_invent.svg" style="
				width:100%;
				margin-top:137px;
				margin-bottom:20px;
			" />
			<?php if (isset($authUrl)): ?>
			  <a class='login' href='<?php echo $authUrl; ?>' style="
				z-index:20;
			  ">
				<button id="main_logout_button" type="button">LOGIN</button>
			  </a>
			<?php else: ?>
			  <a class='logout' href='?logout'>Logout</a>
			<?php endif ?>

			</div>
		</div>
	</div>

	<!----------------------->


	<!------------------------
	----- Scripts ------------
	------------------------->
    <script src="lib/js/jquery-ui/jquery.min.js"></script>
	<script src="lib/js/jquery-ui/jquery-ui.min.js"></script>
    <script src="bootstrap_src/dist/js/bootstrap.min.js"></script>
	<script>

	</script>
  </body>
</html>
