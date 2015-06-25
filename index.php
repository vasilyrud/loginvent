<?php
function cond_check() {
	if (isset($_SESSION['netid']) &&
		isset($_SESSION['priv']) &&
		isset($_SESSION['login_time'])) {
			if (((time() - $_SESSION['login_time']) < 6000) &&
				($_SESSION['priv'] == 'admin' || $_SESSION['priv'] == 'user')) {
				return true;
			} else {
				return false;
			}
	} else {
		return false;
	}
}

$netid = "";
$priv = "";
session_start();


if (cond_check()) {
	$netid = $_SESSION['netid'];
	$priv = $_SESSION['priv'];
	$_SESSION['login_time'] = time();
} else {
	header("Location: php/sessions/logout_redirect.php?logout=");
	exit();
}


?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lab Inventory</title>
	
	<link rel="shortcut icon" href="img/favicon.ico">
	<link rel="stylesheet" href="js/lib/jquery-ui/jquery-ui.css" />-
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
	</style>
	
  </head>
  <body>
    
	<!------------------------
	----- Left Box -----------
	------------------------->
	<div id="left">
		<button id="left_full_button" type="button" class="btn btn-success btn-sm">
			<span class="glyphicon glyphicon-cog"></span>
		</button>
		<div id="left_div1">
			<?php echo '<span>'.$netid.'</span>'; ?>
		</div>
	</div>
	
	<div id="left_full">
		<div id="left_full_div">
			<?php if ($_SESSION['priv'] == 'admin') {
				echo '<form method="link" action="manager.php"><input class="btn btn-success btn-sm left_generic_button" type="submit" value="Open Manager"></form>';
			} ?>
			<button id="test_camera" class="btn btn-success btn-sm left_generic_button" type="button">Test Camera</button>
			<form action="php/sessions/logout_redirect.php" method="get">
				<input type="text" name="logout" style="display:none;">
				<input id="left_logout_button" type="submit" value="Logout">
			</form>
		</div>
	</div>
	<!----------------------->
	
	
	<!------------------------
	----- Navigation Box -----
	------------------------->
	<nav id="nav_myNavbar" class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
        <div id="nav_container" class="container-fluid">
			
			<!-- Action Bar -->
            <div id="navbarCollapse1" class="collapse navbar-collapse">
                <ul id="nav_action_ul" class="nav navbar-nav">
					<li id="nav_action_li" class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<span id="nav_action_toggle">
								<span class="glyphicon glyphicon-chevron-down"></span>
								&nbsp;&nbsp;&nbsp;Select Action&nbsp;&nbsp;&nbsp;
								<span class="glyphicon glyphicon-chevron-down"></span>
							</span>
						</a>
						<ul id="nav_action_li_ul" class="dropdown-menu" role="menu">
							<li>
								<a id="action_identify_qr_code" class="actions" href="#identify_qr_code">
									<table class="actions_table">
										<tbody><tr>
											<td>
												<div class="actions_div">
													<h4>    Identify QR Code</h4>
												</div>
											</td>
											<td class="actions_icon">
												<div>
													<h4><span class="glyphicon glyphicon-qrcode"></span></h4>
												</div>
											</td>
										</tr></tbody>
									</table>
								</a>
							</li>
							<li>
								<a id="action_search_by_item" class="actions" href="#search_by_item">
									<table class="actions_table">
										<tbody><tr>
											<td>
												<div class="actions_div">
													<h4>    Search by Item</h4>
												</div>
											</td>
											<td class="actions_icon">
												<div>
													<h4><span class="glyphicon glyphicon-search"></span></h4>
												</div>
											</td>
										</tr></tbody>
									</table>
								</a>
							</li>
							<li>
								<a id="action_list_all_items" class="actions" href="#list_all_items">
									<table class="actions_table">
										<tbody><tr>
											<td>
												<div class="actions_div">
													<h4>    List All Items</h4>
												</div>
											</td>
											<td class="actions_icon">
												<div>
													<h4><span class="glyphicon glyphicon-list"></span></h4>
												</div>
											</td>
										</tr></tbody>
									</table>
								</a>
							</li>
						</ul>
					</li>
                </ul>
            </div>
			
			<!-- Search Bar -->
            <div id="navbarCollapse2" class="collapse navbar-collapse">
                <form id="search_form" role="form" action="javascript:void(0);">
					<table id="search_tb">
						<tbody><tr>
							<td id="search_tb_td">
								<div id="search_tb_td_div" class="form-group">
									<label class="sr-only" for="search_field">search_bar</label>
									<input id="search_field" type="text" class="form-control" placeholder="Item" autocomplete="off">
								</div>
							</td>
							<td>
								<button id="search_button" class="btn btn-default" type="submit">
									<div id="search_button_div"><span class="glyphicon glyphicon-chevron-right"></span></div>
								</button>
							</td>
						</tr></tbody>
					</table>
				</form>
            </div>
			
        </div>
    </nav>
	<!----------------------->
	
	
	<!------------------------
	----- Content Box --------
	------------------------->
    <div id="main" class="container">	
        <div class="row">
            <div id="main_content" class="col-lg-12">
				<img class="lab_inv_logo_big" src="img/log_invent.svg" />
				<form action="php/sessions/logout_redirect.php" method="get">
					<input type="text" name="logout" style="display:none;">
					<input id="main_logout_button" type="submit" value="Logout">
				</form>
			</div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <footer>
					<hr>
                    <p style="text-transform:none;">NYUAD.superLab('inventory');</p>
                </footer>
            </div>
        </div>
    </div>
	<!----------------------->
	
	
	<!------------------------
	----- Modals ------------
	------------------------->
	<div id="image_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="Show full image" aria-hidden="true">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <img id="item_image_full" src="img/camera_bg.png" />
		</div>
	  </div>
	</div>
	<!----------------------->
	
	
	<!------------------------
	----- Scripts ------------
	------------------------->
	<script data-main="js/index/main" src="js/lib/require.js"></script>
	
	
  </body>
</html>