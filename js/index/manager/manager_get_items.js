define(['jquery'], function($) {
	
	function add_item(item_names) {
		return $.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'php/add_new_item.php',
			data: {
				new_item_name: item_names.item_name,
				new_formal_name: item_names.formal_name,
				new_octo_name: item_names.octo_name
			}
		});
	}
	
	function delete_item(item_id,item_name) {
		return $.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'php/delete_item.php',
			data: {
				'item_id': item_id,
				'item_name': item_name
			}
		});
	}
	
	function edit_item(col,old_val,new_val,item_id) {
		return $.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'php/edit_item.php',
			data: {
				'column': col,
				'old_value': old_val,
				'new_value': new_val,
				'item_id': item_id
			}
		});
	}
	
	return {
		add_item: add_item,
		delete_item: delete_item,
		edit_item: edit_item
	}
	
});