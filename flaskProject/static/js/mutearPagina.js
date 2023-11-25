// varibales de sonido
const audio = document.getElementById("audio-player");
const volume_on = document.getElementById("vOn");
const volume_off = document.getElementById("vOff");

// funcion para quitar el volumen de la pantalla
function quitarVolumen(){
    if (audio.muted) {
        audio.muted = false;
        volume_on.style.display = 'block';
        volume_off.style.display = 'none';
    } else {
        audio.muted = true;
        volume_on.style.display = 'none';
        volume_off.style.display = 'block';
    }
}