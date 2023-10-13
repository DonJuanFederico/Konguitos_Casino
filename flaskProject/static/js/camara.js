//capturar video o imagen
const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");

//tomar foto
const button = document.querySelector(".start-btn");

//mostrar foto
const photo = document.querySelector(".photo");

//constrains
const constraints = {
  video: { width: 420, height: 340 },
  audio: false,
};

let videoStream; // Variable para mantener un seguimiento del stream de video.
let isCameraActive = true; // Variable para controlar si la cámara está activa o no.

// Función para acceder a la cámara
const getVideo = async () => {
  try {
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(videoStream);
  } catch (error) {
    console.log(error);
  }
};

// Si la promesa tiene éxito
const handleSuccess = (stream) => {
  video.srcObject = stream;
  video.play();
};

// Detener la cámara
const stopVideoStream = () => {
  if (videoStream) {
    const tracks = videoStream.getTracks();
    tracks.forEach((track) => track.stop());
  }
};

getVideo();