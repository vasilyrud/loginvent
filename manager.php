<?php
function cond_check() {
	if (isset($_SESSION['netid']) &&
		isset($_SESSION['priv']) &&
		isset($_SESSION['login_time'])) {
			if (((time() - $_SESSION['login_time']) < 6000) &&
				($_SESSION['priv'] == 'admin')) {
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
	<link rel="stylesheet" href="lib/js/jquery-ui/jquery-ui.css" />
    <link href="bootstrap_src/dist/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="css/manager.css" />
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
  <body style="padding-top:5px;">
    
	<!------------------------
	----- Left Box -----------
	------------------------->
	<div id="left">
		<button id="left_full_button" type="button" class="btn btn-success btn-sm" data-toggle="dropdown">
			<span class="glyphicon glyphicon-cog"></span>
		</button>
		<div id="left_div1">
			<?php echo '<span>'.$netid.'</span>'; ?>
		</div>
	</div>
	
	<div id="left_full">
		<div id="left_full_div">
			<form method="link" action="index.php"><input class="btn btn-success btn-sm left_generic_button" type="submit" value="Standard View"></form>
			<form method="link" action="php/qr/generate.php"><input class="btn btn-success btn-sm left_generic_button" type="submit" value="Generate QR Codes"></form>
			<form method="link" action="php/qr/make_pdf.php"><input class="btn btn-success btn-sm left_generic_button" type="submit" value="Make PDF"></form>
			
			<form action="php/sessions/logout_redirect.php" method="get">
				<input type="text" name="logout" style="display:none;">
				<input id="left_logout_button" type="submit" value="Logout">
			</form>
		</div>
	</div>
	<!----------------------->
	
	
	<!------------------------
	----- Content Box --------
	------------------------->
    <div id="main" class="container">	
        <div class="row">
			<div id="button_holder">
				<button id="add_item" class="manager_button btn btn-success btn-sm">ADD NEW ITEM</button>
			</div>
            <div id="main_content" class="col-lg-12 manager_main_content">
				
				<img id="first_loading_gif" src="img/loading.gif" />
				
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
	<div id="deletion_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="deleteTheItem" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
		<div id="delete_item_confirm_holder" class="modal-content">
		  <span id="delete_item_confirm_prompt">Are you sure?</span>
		  <button id="delete_item_confirm" type="button">DELETE</button>
		</div>
	  </div>
	</div>
	
	<div id="edit_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="editTheItem" aria-hidden="true">
	  <div class="modal-dialog">
		<div id="edit_item_modal_holder" class="modal-content">
			<form id="edit_item_form" role="form" action="javascript:void(0);">
				<input type="text" id="edit_item_field" class="form-control">
				<button type="button" id="cancel_edit_button" class="btn btn-success btn-sm item_edit_buttons">Cancel</button>
				<button type="submit" id="confirm_edit_button" class="btn btn-success btn-sm item_edit_buttons">Edit</button>
			</form>
		</div>
	  </div>
	</div>
	
	<div id="image_modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="showFullImage" aria-hidden="true">
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
	<script data-main="js/index/manager/manager_main" src="js/lib/require.js"></script>
	
	
  </body>
</html>