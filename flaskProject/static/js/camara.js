

//capturar video ó imagen
const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");

//tomar foto
const button = document.querySelector(".start-btn");

//mostrar foto
const photo = document.querySelector(".photo");

//constrains
/*
Aquí enviamos las caracteristicas del video y
audio que solicitamos
*/

const constraints = {
  video: { width: 420, height: 340 },
  audio: false,
};


//acceso a la webcam
/*
Aquí recibimos la respuesta del navegador, es una promesa
 */
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSucces(stream);
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
};

//3. -----------> si la promesa tiene exito
const handleSucces = (stream) => {
  video.srcObject = stream;
  video.play();
};

//4.------------>Llamada a la función get
getVideo();

//4. ----------> Button y foto
button.addEventListener("click", () => {
  let context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, 420, 340);
  let data = canvas.toDataURL();
  photo.setAttribute("src", data);
  canvas.innerHTML = '<img id="foto_perfil" class="thumbnail" src="' + foto + '"/>';
  button('pre_boton').style.display = '';
  $("#foto").val(foto);
});