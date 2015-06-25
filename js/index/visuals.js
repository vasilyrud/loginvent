define(['jquery','bootstrap'], function($,bootstrap) {
	
	// Show image fullscreen in modal on click
	$('#main_content').on('click', '.item_image', function() {
		
		var image_src = $(this).attr('src');
		
		$('#item_image_full').attr('src',image_src);
		$('#image_modal').modal('show');
		
	});
	
	$('body').on('click', '#item_image_full', function() {
		
		$('#image_modal').modal('hide');
		
	});
	
	
	// Controls the "Select Action" dropdown menu slide effect
	$('.dropdown').on('show.bs.dropdown', function(e){
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
		
		// Fixes the left box button not responding to select action click
		if (is_open) {
			var $lefty = $('#left_full');
			$lefty.animate({
			  left: parseInt($lefty.css('left'),10) == 0 ?
				-$lefty.outerWidth() :
				0
			});
			is_open = false;
		}
		
	});
	
	$('.dropdown').on('hide.bs.dropdown', function(e){
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
	});
	
	
	// Controls Left Box Menu Toggle
	var is_open = false;
	
	$('body').on('click', '#left_full_button', function() {
		
		var $lefty = $('#left_full');
		
		$lefty.animate({
		  left: parseInt($lefty.css('left'),10) == 0 ?
			-$lefty.outerWidth() :
			0
		},function() {
		  if (parseInt($lefty.css('left'),10)==0) {
			is_open = true;
		  } else {
			is_open = false;
		  }
		});
		
	});
	
	$(document).click(function(event) {
		
		if (is_open && !($(event.target).closest('#left_full_button').length)) {
			var $lefty = $('#left_full');
			$lefty.animate({
			  left: parseInt($lefty.css('left'),10) == 0 ?
				-$lefty.outerWidth() :
				0
			});
			is_open = false;
		}
		
	});
	
});