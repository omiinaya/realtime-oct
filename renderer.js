const { desktopCapturer } = require('electron');
const ipc = require('electron').ipcRenderer
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');

window.onload = function () {
  getVideoSources()
}

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

  video.srcObject = stream;
  video.play()
}

function resizeCanvas() {
  var vW = video.getBoundingClientRect().width
  var vH = video.getBoundingClientRect().height
  var vT = video.getBoundingClientRect().top
  var vL = video.getBoundingClientRect().left
  canvas.style.width = vW + "px";
  canvas.style.height = vH + "px";
  canvas.style.top = vT + "px";
  canvas.style.left = vL + "px";
}

window.addEventListener('resize', function () {
  resizeCanvas()
});

function start() {
  canvas.style.border = '2px solid red'
  console.log('Color tracker has been started.')
}