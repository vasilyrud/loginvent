
requirejs.config({
	baseUrl: "js/index",
	paths: {
		jquery: '../lib/jquery-ui/jquery.min',
		jquery_ui: '../lib/jquery-ui/jquery-ui.min',
		bootstrap: '../lib/bootstrap.min',
		camera: '../lib/camera',
		jsqrcode: '../lib/jsqrcode-combined.min',
		qr_decoder: '../lib/qr_decoder',
		dom_ready: '../lib/dom_ready',
		save_image: '../lib/save_image',
		list: '../lib/list'
	}
});

require([
		'jquery',
		'visuals',
		'get_items',
		'views',
		'camera',
		'dom_ready',
		'jsqrcode',
		'qr_decoder',
		'manager/manager_views',
		'manager/manager_get_items',
		'save_image',
		'list'
	], function(
		$,
		visuals,
		get_items,
		views,
		camera,
		domReady,
		jsqrcode,
		qr_decoder,
		manager_views,
		manager_get_items,
		save_image,
		List
	){
	
	var data_for_images;
	var data_for_item;
	var all_item_data_cols;
	var col;
	var old_val;
	var new_val;
	
	$(document).ready(function() {
		
		get_items.all_data('item_name').then(function(data){
			
			all_item_data_cols = Object.keys(data[0]);
			
			manager_views.manager_table(data, function() {
				var allItemsList = new List('all_items_table_list', {valueNames: all_item_data_cols});
			});
			
		});
		
	});
	
	$('body').on('click', '.all_items_row', function() {
		
		id = $(this).data('item-url');
		
		views.place_loading_gif();
		
		get_items.one_item(id).then(function(data){
			data_for_item = data;
			manager_views.show_item_page(data);
			data_for_images = data;
		}, function(error){
			views.item_not_found();
		});
		
	});
	
	$('body').on('click', '#view_table', function() {
		
		views.place_loading_gif();
		
		get_items.all_data('item_name').then(function(data){
			manager_views.manager_table(data, function() {
				var allItemsList = new List('all_items_table_list', {valueNames: all_item_data_cols});
			});
		});
		
	});
	
	$('body').on('click', '#show_images_button', function() {
		
		views.show_images(data_for_images);
		
	});
	
	$('body').on('click', '#add_item', function() {
		
		manager_views.add_new_item();
		
		$('#item_name').select();
		
	});
	
	$('body').on('submit', '#new_item_form', function() {
		
		var item_names = {
			item_name: $('#item_name').val(),
			formal_name: $('#formal_name').val(),
			octo_name:$('#octo_name').val()
		};
		
		views.place_loading_gif();
		
		manager_get_items.add_item(item_names).then(function(data){
			
			if (data['status'] == "item_exists") {
				manager_views.item_exists();
			} else if (data['status'] == "item_added") {
				get_items.all_data('item_name').then(function(all_data){
					manager_views.manager_table(all_data, function() {
						var allItemsList = new List('all_items_table_list', {valueNames: all_item_data_cols});
					});
				});
			}
			
		});
		
	});
	
	$('body').on('click', '#add_image_button', function() {
		
		manager_views.add_camera();
		
		domReady(function () {
			
			(function initialize_camera() {
				
				return new Promise(function(resolve, reject) {
					
					camera.public_start('#html5_qrcode_video','#main_content');
					
					resolve();
					
				});
				
			})().then(function() {
				
				save_image.public_start();
				
			});
			
		});
		
	});
	
	$('body').on('click', '#switch_cam', function() {
		
		camera.public_switch();
		
	});
	
	$('body').on('click', '.photo_taker', function() {
		
		var image_data = save_image.generate_data();
		var item_id = data_for_item['item_data']['id'];
		var item_name = data_for_item['item_data']['item_name'];
		
		save_image.scan(function() {
			views.replace_camera_with_loading_gif();
			image_data = save_image.generate_data();
		});
		
		get_items.send_photo(image_data,item_id,item_name).then(function() {
			get_items.one_item(item_id).then(function(data){
				data_for_item = data;
				manager_views.show_item_page(data);
				data_for_images = data;
			}, function(error){
				views.item_not_found();
			});
		});
		
	});
	
	$('body').on('click', '#back_to_item', function() {
		
		views.place_loading_gif();
		
		get_items.one_item(id).then(function(data){
			data_for_item = data;
			manager_views.show_item_page(data);
			data_for_images = data;
		}, function(error){
			views.item_not_found();
		});
		
	});
	
	$('body').on('click', '#delete_item_confirm', function() {
		
		var item_id = data_for_item['item_data']['id'];
		var item_name = data_for_item['item_data']['item_name'];
		
		$('#deletion_modal').modal('hide');
		
		views.place_loading_gif();
		
		manager_get_items.delete_item(item_id,item_name).then(function() {
			get_items.all_data('item_name').then(function(data){
				manager_views.manager_table(data, function() {
					var allItemsList = new List('all_items_table_list', {valueNames: all_item_data_cols});
				});
			});
		});
		
	});
	
	$('body').on('click', '.edit_button', function() {
		
		col = $(this).attr('data-col-val');
		old_val = data_for_item['item_data'][col];
		
		function show_modal(callback) {
			$('#edit_modal').modal('show');
			callback();
		}
		
		show_modal(function() {
			$('#edit_item_field').val(old_val).select();
		});
		
	});
	
	$('body').on('click', '#cancel_edit_button', function() {
		
		$('#edit_modal').modal('hide');
		
	});
	
	$('body').on('click', '#confirm_edit_button', function() {
		
		var item_id = data_for_item['item_data']['id'];
		new_val = $('#edit_item_field').val();
		
		$('#edit_modal').modal('hide');
		
		views.place_loading_gif();
		
		manager_get_items.edit_item(col,old_val,new_val,item_id).then(function() {
			get_items.one_item(item_id).then(function(data){
				data_for_item = data;
				manager_views.show_item_page(data);
				data_for_images = data;
			}, function(error){
				views.item_not_found();
			});
		});
		
	});
	
	$('body').on('click', '#view_data_sheet', function() {
		
		get_items.octo_get(data_for_item['item_data']['octo_name']).then(function(data) {
			views.show_data_sheets(data);
		});
		
	});
	
});
