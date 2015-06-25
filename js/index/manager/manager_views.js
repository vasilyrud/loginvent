define(['jquery','qr_decoder','views','jquery_ui'], function($,qr_decoder,views) {
	
	function manager_table(data, callback) {
		
		change_button('add_item');
		
		views.make_table(data,'manager');
		
		if (!!callback) {
			callback();
		}
		
	}
	
	function change_button(type) {
		
		if (type=="view_table") {
			$('#button_holder').html(
				'<button id="view_table" class="manager_button btn btn-success btn-sm">BACK TO TABLE</button>'
			)
		} else if (type=="add_item") {
			$('#button_holder').html(
				'<button id="add_item" class="manager_button btn btn-success btn-sm">ADD NEW ITEM</button>'
			)
		} else if (type=="back_to_item") {
			$('#button_holder').html(
				'<button id="back_to_item" class="manager_button btn btn-success btn-sm">BACK TO ITEM INFO</button>'
			)
		}
		
	}
	
	function add_camera() {
		
		change_button('back_to_item');
		
		views.add_camera('manager');
		
	}
	
	function show_item_page(data) {
		
		views.prepare_main_content('manager');
		
		change_button('view_table');
		
		$('#main_content').append('<div id="item_div_data"></div>');
		var all_item_keys = Object.keys(data['item_data']);
		for (var i=0; i<all_item_keys.length; i++) {
			$('#item_div_data').append(
				'<p class="item_data_p col_'+all_item_keys[i]+'">'+
					'<span class="item_data_span">'+
						all_item_keys[i].replace('_',' ')+':  '+
					'</span>'+
					data['item_data'][all_item_keys[i]]+
				'</p>'
			);
		}
		
		$('.col_id').append(
			'<span><button id="delete_item_button" type="button" data-toggle="modal" data-target="#deletion_modal">Delete Item</button></span>'
		);
		
		$('.col_item_name').append(
			'<span id="edit_item_name" class="edit_button" data-col-val="item_name">'+
			'<span class="glyphicon glyphicon-pencil"></span></span>'
		);
		$('.col_formal_name').append(
			'<span id="edit_formal_name" class="edit_button" data-col-val="formal_name">'+
			'<span class="glyphicon glyphicon-pencil"></span></span>'
		);
		$('.col_octo_name').append(
			'<span id="edit_octo_name" class="edit_button" data-col-val="octo_name">'+
			'<span class="glyphicon glyphicon-pencil"></span></span>'
		);
		
		views.add_view_data_sheet_button();
		
		views.add_show_images_button(data);
		
	}
	
	function add_new_item() {
		
		views.prepare_main_content('manager');
		
		change_button('view_table');
		
		$('#main_content').append(
			'<form id="new_item_form" role="form" action="javascript:void(0);">'+
				'<input type="text" class="add_item_field form-control" id="item_name" placeholder="Item Name">'+
				'<input type="text" class="add_item_field form-control" id="formal_name" placeholder="Formal Name">'+
				'<input type="text" class="add_item_field form-control" id="octo_name" placeholder="Octopart Name">'+
				'<button type="submit" id="add_item_submit" class="btn btn-success btn-sm">Add Item</button>'+
			'</form>'
		);
		
	}
	
	function item_exists() {
		
		views.prepare_main_content('manager');
		
		change_button('add_item');
		
		$('#main_content').append('<p id="item_exists_message">Item with this name already exists in the database</p>');
		
	}
	
	return {
		add_camera: add_camera,
		manager_table: manager_table,
		show_item_page: show_item_page,
		add_new_item: add_new_item,
		item_exists: item_exists
	}
	
});