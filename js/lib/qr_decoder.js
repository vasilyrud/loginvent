define(['jquery'], function($) {

	var vid_width = 0;
	var vid_height = 0;
	var vid_ratio = 1;
	var desired_width = 300;
	var desired_height = 0;

	var canvas;
	var video;
	var context;
	
	var do_scan;
	
	function initialize() {
		return new Promise(function(resolve, reject) {
			
			canvas = document.getElementById('qr-canvas');
			video = $('#html5_qrcode_video').get(0);
			context = canvas.getContext('2d');
			do_scan = true;
			
			resolve();
			
		});
	}
	
	function get_video_size() {
		
		vid_height = $("#html5_qrcode_video")[0].videoHeight;
		vid_width = $("#html5_qrcode_video")[0].videoWidth;
		vid_ratio = vid_width/vid_height;
		desired_height = desired_width/vid_ratio;
		
	}
	
	function sharpen(ctx, w, h, mix) {
		var weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
			katet = Math.round(Math.sqrt(weights.length)),
			half = (katet * 0.5) | 0,
			dstData = ctx.createImageData(w, h),
			dstBuff = dstData.data,
			srcBuff = ctx.getImageData(0, 0, w, h).data,
			y = h;
		while (y--) {
			x = w;
			while (x--) {
				var sy = y,
					sx = x,
					dstOff = (y * w + x) * 4,
					r = 0,
					g = 0,
					b = 0,
					a = 0;
				for (var cy = 0; cy < katet; cy++) {
					for (var cx = 0; cx < katet; cx++) {
						var scy = sy + cy - half;
						var scx = sx + cx - half;
						if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
							var srcOff = (scy * w + scx) * 4;
							var wt = weights[cy * katet + cx];
							r += srcBuff[srcOff] * wt;
							g += srcBuff[srcOff + 1] * wt;
							b += srcBuff[srcOff + 2] * wt;
							a += srcBuff[srcOff + 3] * wt;
						}
					}
				}
				dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
				dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
				dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix)
				dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
			}
		}
		ctx.putImageData(dstData, 0, 0);
	}
	
	function filterCanvas(filter) {
		if (canvas.width > 0 && canvas.height > 0) {
			var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			filter(imageData);
			context.putImageData(imageData, 0, 0);
		}
	}
	
	function threshold(pixels) {
	  var d = pixels.data;
	  for (var i=0; i<d.length; i+=4) {
		var r = d[i];
		var g = d[i+1];
		var b = d[i+2];
		//                           Default is >= 110
		var v = (0.2126*r + 0.7152*g + 0.0722*b >= 110) ? 255 : 0;
		d[i] = d[i+1] = d[i+2] = v
	  }
	  return pixels;
	};
	
	function filter_image(filter_type) {
		
		if (filter_type=='sharpen') {
			sharpen(context, canvas.width, canvas.height, 1);
		} else if (filter_type=='threshold') {
			filterCanvas(threshold);
		}
		
	}
	
	function scan() {
		
		if (!do_scan) {
			return;
		}
		
		get_video_size();
		
		context.drawImage(video, 0, 0, desired_width,desired_height);
		
		filter_image('sharpen');
		
		try {
		  qrcode.decode();
		} catch(e) {
		  //console.log(e);
		}
		
		setTimeout(scan, 500);
	}

	function public_start(qrcodeSuccess) {
		
		initialize().then(function() {
			setTimeout(scan,1000);
			qrcode.callback = qrcodeSuccess;
		});
		
	}
	
	function stop_scan() {
		
		do_scan = false;
		
	}
	
	return {
		public_start: public_start,
		stop_scan: stop_scan
	}

});
