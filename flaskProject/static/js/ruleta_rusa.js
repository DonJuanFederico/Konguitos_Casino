var recamaras = 6;
var posicionDeBala = Math.floor(Math.random() * recamaras) + 1; //Ponemos +1 para que no salga 0
var recamaraActual = 1;

document.getElementById('disparar').disabled = false;
function disparar() {
    //si queda solo una recamara restante se acaba el juego
    if (recamaraActual === recamaras-1) {
        recamaraActual++;
        document.getElementById('resultado').innerText = "¡GANASTE!";
        document.getElementById('balas').innerText = "Recámaras restantes: " + (recamaras - recamaraActual + 1);
        //bloqueamos el boton de disparar
        document.getElementById('disparar').disabled = true;
        }
    else if (recamaraActual === posicionDeBala) {
        document.getElementById('resultado').innerText = "¡¡¡BANG!!!";
        document.getElementById('balas').innerText = "¡Perdiste!";
    } else {
        document.getElementById('resultado').innerText = "¡¡¡Click!!!";
        recamaraActual++;
        document.getElementById('balas').innerText = "Recámaras restantes: " + (recamaras - recamaraActual + 1);
    }
}

function retirarse(){
    //Al darle click al boton retirarse se reinicia el juego
    recamaras = 6;
    posicionDeBala = Math.floor(Math.random() * recamaras) + 1; //Ponemos +1 para que no salga 0
    recamaraActual = 1;
    document.getElementById('resultado').innerText = "";
    document.getElementById('balas').innerText = "Recámaras restantes: " + (recamaras - recamaraActual + 1);
    document.getElementById('disparar').disabled = false;
}