define(['jquery'], function($) {

	var vid_width = 0;
	var vid_height = 0;
	var vid_ratio = 1;
	var desired_width = 665;
	var desired_height = 0;

	var canvas;
	var video;
	var context;
	
	var do_scan;
	
	function initialize() {
		
		canvas = document.getElementById('qr-canvas');
		video = $('#html5_qrcode_video').get(0);
		context = canvas.getContext('2d');
		do_scan = true;
		
		$('#take_photo_div').append(
			'<button type="button" id="take_photo" class="photo_taker">Take Photo</button>'
		);
		
	}
	
	function set_canvas_size() {
		
		$('#qr-canvas').attr('width',String(desired_width)).attr('height',String(desired_height));
		$('#html5_qrcode_video').addClass('photo_taker');
		
	}
	
	function get_video_size(resolve) {
		
		vid_height = $("#html5_qrcode_video")[0].videoHeight;
		vid_width = $("#html5_qrcode_video")[0].videoWidth;
		vid_ratio = vid_width/vid_height;
		desired_height = desired_width/vid_ratio;
		
		resolve()
		
	}
	
	function generate_data() {
		
		return canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
		
	}
	
	function scan(resolve) {
		
		if (!do_scan) {
			return;
		}
		
		get_video_size(function() {
			set_canvas_size();
		});
		
		context.drawImage(video, 0, 0, desired_width,desired_height);
		
		resolve();
		
	}

	function public_start(photo_taken) {
		
		initialize();
		
	}
	
	function stop_scan() {
		
		do_scan = false;
		
	}
	
	return {
		scan: scan,
		public_start: public_start,
		stop_scan: stop_scan,
		generate_data: generate_data
	}

});
