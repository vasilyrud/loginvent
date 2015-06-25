define(['jquery'], function($) {
	
	function all_data(order_by) {
		return $.ajax({
			type: 'GET',
			dataType: 'json',
			url: 'php/get_items_data.php',
			data: {
				'order_by':order_by
			}
		});
	}
	
	function one_item(id) {
		return $.ajax({
			type: 'GET',
			dataType: "json",
			url: 'php/get_one_item.php',
			data: {
				'id':id
			}
		});
	}
	
	function item_names() {
		return $.ajax({
			type: 'GET',
			dataType: "json",
			url: 'php/get_items_names.php'
		});
	}
	
	function search_item(term) {
		return $.ajax({
			type: 'GET',
			dataType: "json",
			url: 'php/search_items.php',
			data: {
				'term': term
			}
		});
	}
	
	function send_photo(data, id, name) {
		return $.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'php/receive_photo.php',
			data: { 
				'image_data': data,
				'item_id': id,
				'item_name': name
			}
		});
	}
	
	function octo_get(octo_name) {
		return $.ajax({
			type: 'GET',
			dataType: 'json',
			url: 'http://octopart.com/api/v3/parts/match?apikey=ff139285&callback=?&include[]=datasheets',
			data: {queries: JSON.stringify([
				{'mpn': octo_name}
			])}
		});
	}
	
	return {
		all_data: all_data,
		one_item: one_item,
		item_names: item_names,
		search_item: search_item,
		send_photo: send_photo,
		octo_get: octo_get
	}
	
});