const { desktopCapturer } = require('electron');
const ipc = require('electron').ipcRenderer
const { createWorker, createScheduler } = Tesseract;
const videoElement = document.querySelector('video');
const scheduler = createScheduler();
let timerId = null;

document.addEventListener("DOMContentLoaded", function () {
  getVideoSources()
  initialize()
});

async function getVideoSources() {
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });

  inputSources.map(source => {
    if (source.name === 'Entire Screen' || source.name === 'Screen 1') {
      selectSource(source)
    }
  })
}

//change the videoSource window to record
async function selectSource(source) {
  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
      }
    }
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  videoElement.srcObject = stream;
  videoElement.play()
}