define([], function() {
	
	var videoElement;
	var cameras = [];
	var audios = [];
	var cameras_counter = 0;
	
	function initialize(video_div) {
		return new Promise(function(resolve, reject) {
			
			videoElement = document.querySelector(video_div);
			cameras_counter = 0;
			
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			
			if (typeof MediaStreamTrack === 'undefined'){
			  console.log('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
			} else {
			  MediaStreamTrack.getSources(gotSources);
			}
			
			resolve();
		});
	}
	
	function gotSources(sourceInfos) {
	  for (var i = 0; i != sourceInfos.length; ++i) {
		var sourceInfo = sourceInfos[i];
		source_value = sourceInfo.id;
		if (sourceInfo.kind === 'audio') {
		  audios.push(source_value);
		} else if (sourceInfo.kind === 'video') {
		  cameras.push(source_value);
		} else {
		  console.log('Some other kind of source: ', sourceInfo);
		}
	  }
	}

	function successCallback(stream) {
	  window.stream = stream; // make stream available to console
	  videoElement.src = window.URL.createObjectURL(stream);
	  videoElement.play();
	}

	function errorCallback(error){
	  console.log("navigator.getUserMedia error: ", error);
	}

	function start(audio_id,video_id){
	  if (!!window.stream) {
		videoElement.src = null;
		window.stream.stop();
	  }
	  var audioSource = audio_id;
	  var videoSource = video_id;
	  var constraints = {
		audio: {
		  optional: [{sourceId: audioSource}]
		},
		video: {
		  optional: [{sourceId: videoSource}]
		}
	  };
	  navigator.getUserMedia(constraints, successCallback, errorCallback);
	}

	function public_start(video_element, container_element) {
		initialize(video_element).then(function() {
			start(audios[0],cameras[0]);
			fix_camera_width(container_element);
		});
	}

	function public_switch() {
		if (cameras.length>1) {
			if (cameras_counter==(cameras.length-1)) {
				cameras_counter = 0;
			} else {
				cameras_counter+=1;
			}
			start(audios[0],cameras[cameras_counter]);
		}
	}
	
	function fix_camera_width(container_div) {
		if (videoElement.width != $(container_div).width()) {
			videoElement.width = $(container_div).width();  // <--  Fixes video width (purely cosmetic)
		}
	}
	
	return {
		initialize: initialize,
		public_start: public_start,
		public_switch: public_switch,
		fix_camera_width: fix_camera_width
	}

});