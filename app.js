// Credits to my boy victordibia @https://github.com/victordibia/handtrack.js/

const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 1,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}

navigator.getUserMedia = 
navigator.getUserMedia || 
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia || // Firefox
navigator.msGetUserMedia; // Microsoft

// Select from html
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const finalvid = document.querySelector('#vidsmall');
const active = document.querySelector('.active');
const mutestatus = document.querySelector('.mutestatus');


let model;

handTrack.startVideo(video)
  .then(status => {
    if(status){
      navigator.getUserMedia({video: {}}, stream => {
        video.srcObject = stream;
        // Run hand detection
        setInterval(runDetection, 100)
      },
      err => console.log(err))
    }
  })

function runDetection(){
  model.detect(video).then(predictions => {
    if(predictions.length !== 0){
      let hand1 = predictions[0].bbox;
      let x = hand1[0];
      let y = hand1[1];

      if(x < 60){ 
        if(y < 100){
          finalvid.muted = !finalvid.muted;

          active.textContent = "You pressed the Mute/Unmute button";
          mutestatus.textContent = finalvid.muted;
        }
        if(y > 220){
          finalvid.play();
          active.textContent = "You pressed the Play button";
        }
      }

      if(x > 450){
        if(y > 220){
          finalvid.pause();
          active.textContent = "You pressed the Pause button";
        }
      }


    }
  })
}

handTrack.load(modelParams)
  .then(lmodel => {
    model = lmodel;
  })
