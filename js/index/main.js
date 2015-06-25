
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
		save_image: '../lib/save_image'
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
		'save_image'
	], function(
		$,
		visuals,
		get_items,
		views,
		camera,
		domReady,
		jsqrcode,
		qr_decoder,
		save_image
	){
	
	var item_names_ids;
	var id;
	var data_for_images;
	var data_for_item;
	
	$('body').on('click', '#action_list_all_items', function() {
		
		views.place_loading_gif();
		
		get_items.all_data('item_name').then(function(data){
			views.make_table(data);
		});
		
	});
	
	$('body').on('click', '#show_images_button', function() {
		
		views.show_images(data_for_images);
		
	});
	
	$('body').on('click', '.all_items_row', function() {
		
		id = $(this).data('item-url');
		
		views.place_loading_gif();
		
		get_items.one_item(id).then(function(data){
			data_for_item = data;
			views.show_item_page(data);
			data_for_images = data;
		}, function(error){
			views.item_not_found();
		});
		
	});
	
	$('body').on('click', '#action_search_by_item', function() {
		
		views.place_loading_gif();
		
		get_items.item_names().then(function(data){
			views.search_page(data);
			item_names_ids = data;
		});
		
	});
	
	$('body').on('autocompleteselect', '#search_field', function(event,ui) {
		
		id = item_names_ids[ui.item.value];
		
		$('#search_field').blur();
		
		views.place_loading_gif();
		
		get_items.one_item(id).then(function(data){
			data_for_item = data;
			views.show_item_page(data);
			data_for_images = data;
		}, function(error){
			views.item_not_found();
		});
		
	});
	
	$('body').on('submit', '#search_form', function() {
		
		$('#search_field').autocomplete('close').blur();
		
		search_term = $('#search_field').val();
		
		views.place_loading_gif();
		
		get_items.search_item(search_term).then(function(data){
			views.search_for_item_page(data);
		});
		
	});
	
	$('body').on('click', '.all_items_headers', function() {
		
		views.place_loading_gif();
		
		get_items.all_data($(this).attr('id')).then(function(data){
			views.make_table(data);
		});
		
	});
	
	$('body').on('click', '#test_camera', function() {
		
		views.add_camera();
		
		domReady(function () {
			
			camera.public_start('#html5_qrcode_video','#main_content');
			
		});
		
	});
	
	$('body').on('click', '#switch_cam', function() {
		
		camera.public_switch();
		
	});
	
	$('body').on('click', '#action_identify_qr_code', function() {
		
		views.add_camera();
		
		domReady(function () {
			
			(function initialize_camera() {
				
				return new Promise(function(resolve, reject) {
					
					camera.public_start('#html5_qrcode_video','#main_content');
					
					resolve();
					
				});
				
			})().then(function() {
				
				qr_decoder.public_start(function(data){
					
					id = parseInt(data);
					
					views.place_loading_gif();
					
					get_items.one_item(id).then(function(data){
						data_for_item = data;
						views.show_item_page(data);
						data_for_images = data;
					}, function(error){
						views.item_not_found();
					});
					
				});
				
			});
			
		});
		
	});
	
	$('body').on('click', '#add_image_button', function() {
		
		views.add_camera();
		
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
	
	$('body').on('click', '.photo_taker', function() {
		
		var image_data = save_image.generate_data();
		var item_id = data_for_item['item_data']['id'];
		var item_name = data_for_item['item_data']['item_name'];
		
		save_image.scan(function() {
			views.replace_camera_with_loading_gif();
			image_data = save_image.generate_data();
		});
		
		get_items.send_photo(image_data,item_id,item_name).then(function() {
			//console.log('data was sent');
			get_items.one_item(item_id).then(function(data){
				data_for_item = data;
				views.show_item_page(data);
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
