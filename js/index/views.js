define(['jquery','qr_decoder','jquery_ui'], function($,qr_decoder) {
	
	function place_loading_gif() {
		
		stop_video();
		
		$('#main_content').empty().append('<img id="loading_gif" src="img/loading.gif" alt="Loading..." />');
		
	}
	
	function replace_camera_with_loading_gif() {
		
		stop_video();
		
		$('#something_fake').remove();
		$('#html5_qrcode_video').remove();
		$('#take_photo').remove();
		$('#switch_cam').remove();
		
		$('#main_content').append('<img id="loading_gif" src="img/loading.gif" alt="Loading..." />');
		
	}
	
	function stop_video() {
		
		if (!!window.stream) {
			window.stream.stop();
		}
		
		qr_decoder.stop_scan();
		
	}
	
	function clear_page() {
		
		stop_video();
		
		$('#main_content').empty();
		
	}
	
	function prepare_main_content(value) {
		
		clear_page();
		
		if (value=='search') {
			$('body').css({
			  "padding-top": "112px"
			});
			$('#navbarCollapse2').each(function () {
			  this.style.setProperty( 'display', 'block', 'important' );
			});
			$('#search_field').val('').focus();
		} else if (value=='manager') {
			$('body').css({
			  "padding-top": "5px"
			});
			$('#navbarCollapse2').each(function () {
			  this.style.setProperty( 'display', 'none', 'important' );
			});
		} else {
			$('body').css({
			  "padding-top": "18px"
			});
			$('#navbarCollapse2').each(function () {
			  this.style.setProperty( 'display', 'none', 'important' );
			});
		}
		
	}
	
	function make_tbody(data,columns) {
		
		var r = new Array(), j = -1;
		for (var i=0, data_length=data.length; i<data_length; i++){
			r[++j] = '<tr class="all_items_row" data-item-url="'+data[i]['id']+'">';
			for (var col=0; col<columns.length; col++) {
				r[++j] = '<td class="all_items_row_col '+columns[col]+'">'+data[i][columns[col]]+'</td>';
			}
			r[++j] = '</tr>';
		}
		
		return r;
		
	}
	
	function make_thead(data,columns) {
		
		var c = new Array(), k = -1;
		c[++k] = '<tr>';
		for (var col=0; col<columns.length; col++) {
			c[++k] = '<th id="'+columns[col]+'" class="all_items_headers sort" data-sort="'+columns[col]+'">'+columns[col].replace('_',' ')+'</th>';
		}
		c[++k] = '</tr>';
		
		return c;
		
	}
	
	function make_table(data,is_manager){
		
		var columns = Object.keys(data[0]);
		
		var r = make_tbody(data,columns);
		var c = make_thead(data,columns);
		
		prepare_main_content(is_manager);
		
		$('#main_content').append(
			'<div id="all_items_table_list">'+
				'<table id="action_list_all_items_table" class="table">'+
					'<thead id="table_all_columns"></thead>'+
					'<tbody id="table_all_data" class="list"></tbody>'+
				'</table>'+
			'</div>'
		);
		
		if (is_manager == "manager") {
			$('#all_items_table_list').prepend(
				'<form id="manager_search_form">'+
					'<input id="manager_search_field" class="search" type="text" placeholder="Search by Item Name"></input>'+
				'</form>'
			);
		}
		
		$('#table_all_data').html(r.join(''));
		$('#table_all_columns').html(c.join(''));
		
	}
	
	function add_view_data_sheet_button() {
		
		$('#main_content').append(
			'<div id="item_div_data_sheet">'+
				'<button id="view_data_sheet" type="button">View Data Sheet</button>'+
			'</div>'
		);
		
	}
	
	function add_show_images_button(data) {
		
		var number_of_images = data['images'].length;
		
		if (number_of_images > 0) {
			$('#main_content').append(
				'<div id="item_div_images">'+
					'<button id="show_images_button" type="button">Show Image</button>'+
				'</div>'
			);
		} else {
			$('#main_content').append(
				'<button id="add_image_button" type="button">Add Image</button>'
			);
		}
		
	}
	
	function show_item_page(data) {
		
		prepare_main_content();
		
		$('#main_content').append('<div id="item_div_data"></div>');
		var all_item_keys = Object.keys(data['item_data']);
		for (var i=0; i<all_item_keys.length; i++) {
			$('#item_div_data').append(
				'<p class="item_data_p">'+
					'<span class="item_data_span">'+
						all_item_keys[i].replace('_',' ')+':  '+
					'</span>'+
					data['item_data'][all_item_keys[i]]+
				'</p>'
			);
		}
		
		add_view_data_sheet_button();
		
		add_show_images_button(data);
		
	}
	
	function show_images(data) {
		
		$('#show_images_button').remove();
		
		var number_of_images = data['images'].length;
		
		for (var i=0; i<number_of_images; i++) {
			$('#item_div_images').append(
				'<img class="item_image" src="img/items/'+
					data['item_data']['id']+
					'/'+
					data['images'][i]['image_id']+
					'.png">'+
				'<button id="add_image_button" type="button">Update Photo</button>'
			);
		}
		
	}
	
	function show_data_sheets(data) {
		
		$('#view_data_sheet').remove();
		
		if (data['results'][0]['hits'] == 0) {
			$('#item_div_data_sheet').append('<p>No Datasheets available for the given octopart name</p>');
		} else {
			for (var i=0; i<data['results'][0]['items'].length; i++) {
				$('#item_div_data_sheet').append('<h4>'+data['results'][0]['items'][i]['brand']['name']+'</h4>');
				for (var j=0; j<data['results'][0]['items'][i]['datasheets'].length; j++) {
					var datasheet_url = data['results'][0]['items'][i]['datasheets'][j]['url'];
					$('#item_div_data_sheet').append('<a href="'+datasheet_url+'">'+datasheet_url.split("/").slice(-1)[0]+'</a><br />');
				}
			}
		}
		
	}
	
	function search_page(data) {
		
		prepare_main_content('search');
		
		$('#main_content').append('<h4></h4>');
		
		$("#search_field").autocomplete({
			source: function(request, response) {
				var max_list_length = 5;
				response($.ui.autocomplete.filter(Object.keys(data), request.term).slice(0, max_list_length));
			},
			minLength: 2
		});
		
	}
	
	function search_for_item_page(data) {
		
		prepare_main_content();
		
		var search_item_keys = Object.keys(data);
		if (search_item_keys.length==0) {
			item_not_found();
		} else {
			var r = new Array(), j = -1;
			for (var i=0; i<search_item_keys.length; i++){
				r[++j] = '<tr class="all_items_row" data-item-url="'+data[search_item_keys[i]]+'">';
					r[++j] = '<td class="all_items_row_col">'+data[search_item_keys[i]]+'</td>';
					r[++j] = '<td class="all_items_row_col">'+search_item_keys[i]+'</td>';
				r[++j] = '</tr>';
			}
			$('#main_content').append(
				'<table id="search_items_table" class="table">'+
					'<thead id="table_all_columns">'+
						'<tr>'+
							'<th class="search_items_headers">Id</th>'+
							'<th class="search_items_headers">Item Name</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody id="table_all_data"></tbody>'+
				'</table>');
			$('#table_all_data').html(r.join(''));
		}
		
	}
	
	function item_not_found() {
		
		prepare_main_content('search');
		
		$('#main_content').html('<h4>Item Not Found</h4>');
		
	}
	
	function add_camera(is_manager) {
		
		prepare_main_content(is_manager);
		
		$('#main_content').append(
			'<button type="button" id="switch_cam">Switch Camera</button>'
		);
		$('#main_content').append(
			'<video id="html5_qrcode_video" poster="img/camera_bg.png" muted autoplay></video>'
		);
		$('#main_content').append(
			'<div id="take_photo_div"></div>'
		);
		$('#main_content').append(
			'<div id="reader" style="width:100%;">'+
				'<canvas id="qr-canvas" width="305px" height="500px">'+
				'</canvas>'+
			'</div>'
		);
		
	}
	
	return {
		clear_page: clear_page,
		stop_video: stop_video,
		place_loading_gif: place_loading_gif,
		replace_camera_with_loading_gif: replace_camera_with_loading_gif,
		make_table: make_table,
		prepare_main_content: prepare_main_content,
		show_item_page: show_item_page,
		search_page: search_page,
		search_for_item_page: search_for_item_page,
		add_camera: add_camera,
		item_not_found: item_not_found,
		show_images: show_images,
		add_show_images_button: add_show_images_button,
		show_data_sheets: show_data_sheets,
		add_view_data_sheet_button: add_view_data_sheet_button
	}
	
});