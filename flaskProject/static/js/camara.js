//capturar video ó imagen
const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");

//tomar foto
const button = document.querySelector(".start-btn");

//mostrar foto
const photo = document.querySelector(".photo");

const constraints = {
  video: { width: 420, height: 340 },
  audio: false,
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSucces(stream);
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
};

const handleSucces = (stream) => {
  video.srcObject = stream;
  video.play();
};

getVideo();
