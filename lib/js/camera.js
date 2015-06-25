var videoElement = document.querySelector("video");
var audioSelect = document.querySelector("select#audioSource");
var videoSelect = document.querySelector("select#videoSource");
var startButton = document.querySelector("button#start");
var cameras = [];
var audios = [];

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

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

if (typeof MediaStreamTrack === 'undefined'){
  console.log('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
} else {
  MediaStreamTrack.getSources(gotSources);
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


/* Initiates camera streaming */
start(audios[0],cameras[0]);


/* Camera Switcher */
var cameras_counter = 0;
$('#switch_cam').click(function() {
	if (cameras.length>1) {
		if (cameras_counter==(cameras.length-1)) {
			cameras_counter = 0;
		} else {
			cameras_counter+=1;
		}
		start(audios[0],cameras[cameras_counter]);
	}
});