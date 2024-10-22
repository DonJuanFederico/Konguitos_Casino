var bloqueoEvento = true;

// obtener los elementos html
// obtenemos las cadenas
var blackout = document.querySelector('.blackout');
var blackout_2 = document.querySelector('.blackout_2');

// obtenemos los diferentes eventos
var eventoGashapon = document.getElementById('cargarGashapon');
var eventoRuleta = document.getElementById('cargarRuletaRusa');

// obtenemos todos los valores de todos los temporizadores
var dias = document.getElementById('dias');
var horas = document.getElementById('horas');
var minutos = document.getElementById('minutos');
var segundos = document.getElementById('segundos');

function unclockEventoGashapon(){
    blackout.style.display = 'none';   // quitar cadenas del evento 1
    eventoGashapon.classList.add('hover');    // hacemos q el evento del hover este disponible y visible
    bloqueoEvento = false;
}

function unclockEventoRuleta(){
    blackout_2.style.display = 'none';   // quitar cadenas del evento 1
    eventoRuleta.classList.add('hover');    // hacemos q el evento del hover este disponible y visible
    bloqueoEvento = false;
}

function gashapon(){
    //if(!bloqueoEvento){
        console.log("Entrando en la función gashapon"); // Esto se mostrará en la consola cuando se haga clic en la imagen
        window.location.href = '/Juegos/Eventos/Gashapon';  // GASHAPON
        console.log("Redirigiendo a " + window.location.href); // Esto se mostrará en la consola después de cambiar la URL
    //}
}
function ruletaRusa(){
    //if(!bloqueoEvento){
        window.location.href = "/Juegos/Eventos/RuletaRusa";  // RULETA RUSA
    //}
}

document.addEventListener('DOMContentLoaded', function() {
    // Define la fecha y hora de reinicio (lunes a las 00:00:00)
    const restartTime = new Date();
    restartTime.setHours(0, 0, 0, 0);
    restartTime.setDate(restartTime.getDate() + (1 + 7 - restartTime.getDay()) % 7);

    function actualizarTemporizador() {
        const ahora = new Date();
        const diaDeLaSemana = ahora.getDay();
        const horaDelDia = ahora.getMinutes();
        // Oculta el temporizador los lunes (día 1) y muestra los demás días
        const mostrarTemporizador = diaDeLaSemana !== 1; //&& (horaDelDia < 8 || horaDelDia >= 17); // el contador se muestra a 0

        const tiempoRestante = restartTime - ahora;

        // Calcula días, horas, minutos y segundos restantes
        const day = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        const hour = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const min = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        const sec = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        // Formatea y muestra el temporizador
        dias.innerHTML = `${day}`;
        horas.innerHTML = `${hour}`;
        minutos.innerHTML = `${min}`;
        segundos.innerHTML = `${sec}`;
        if(mostrarTemporizador){
            document.getElementById('temporizador').style.display = 'flex';
        } else{
            document.getElementById('temporizador').style.display = 'none';
        }

        // Si llegamos al reinicio, reinicia el temporizador
        if (tiempoRestante <= 0) {
            reiniciarTemporizador();
        } else {
            // Sigue actualizando el temporizador en tiempo real
            requestAnimationFrame(actualizarTemporizador);
        }
    }
    function reiniciarTemporizador() {
        // Reinicia el temporizador configurando la próxima fecha de reinicio (lunes)
        restartTime.setDate(restartTime.getDate() + 7);
        // Actualiza el temporizador inmediatamente después de reiniciar
        actualizarTemporizador();
    }

    // Inicializa el temporizador
    actualizarTemporizador();
});

/*
    FALTA Q LOS LUNES QUEDE ABIERTO EL TEMPORIZADOR (DESAPAREZCA)
    Y CUANDO SEA MARTES VUELVA A APARECER EL TEMPORIZADOR
 */

function volverAtras() {
    document.location.href = '/Juegos/';
}