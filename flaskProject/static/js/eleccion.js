let roundCounter = 1;
let number = 4;
let extra = 2;
let winings = 0;

let opciones = ['x 0.3 KG','x 0.3 KG', 'x 0.3 KG', 'x 0 KG'];

let cierre = false;
let bloqueo = true;
let retirarse = document.getElementById('withdraw');
let KGs = document.getElementById('KGs');
let betAmount = parseFloat(document.getElementById('amount').value);
//document.getElementById('counter').textContent = opciones;
function startGame(){
    if(isNaN(parseFloat(document.getElementById('amount').value)) === false) {
        firstOptions();

        document.getElementById('marcoJuego').addEventListener('click', function (event) {
            if(!cierre) {
                // coger lo elementos con la clase seleccionada
                var elementosConClase = document.getElementsByClassName("option-button");
                var arrayElementos = Array.from(elementosConClase);
                if (event.target.classList.contains('option-button')) {
                    roundCounter++;
                    checkOption();
                    // Check if 5 rounds have passed
                    if (roundCounter % 5 === 1) {
                        if (roundCounter < 17) {
                            //document.getElementById('counter').textContent = 'Ronda: ' + (roundCounter - 1)  + ', opciones:' + (number + extra) + ', prob. acierto: ' + prob + ', rondas ganadas y perdidas: ' + rWin + ' - ' + rLost + '. Ahora tienes mas opciones';
                            // remove previous options
                            removeOptions(arrayElementos);
                            moreOptions();
                            // Add two more options
                            addOptions(number, extra);
                            extra = extra + 2;
                        }
                        retirarse.style.opacity = '1';
                        bloqueo = false;
                        retirarse.style.cursor = 'pointer';
                    }
                    if (roundCounter % 5 !== 1 || roundCounter > 16) {
                        if (roundCounter % 5 !== 1) {
                            retirarse.style.opacity = '0';
                            bloqueo = true;
                            retirarse.style.cursor = 'default';
                        }
                        removeOptions(arrayElementos);
                        opciones.sort(() => Math.random() - 0.5);
                        addOptions(number, (extra - 2));
                    }
                    prob = 1 - prob_acierto(opciones, 'x 0 KG');
                    document.getElementById('counter').textContent = 'Ronda: ' + (roundCounter - 1) + ', opciones:' + (number + extra - 2) + ', prob. acierto: ' + prob + '.';
                }
            }
        });
    } else alert('Tienes que apostar un mínimo de 1 KG. Gracias.')
}

function firstOptions() {
    retirarDinero();
    opciones.sort(() => Math.random() - 0.5);  // desordena las opciones
    document.getElementById('marcoJuego').innerHTML = '';
    // Generate 4 random options
    if(roundCounter === 1) addOptions(0, 4);
}

function addOptions(act_opt, mr_opt) {
    for (let i = 0; i < (act_opt + mr_opt); i++) {
        const optionButton = document.createElement('div');
        optionButton.classList.add('option-button');
        optionButton.textContent = opciones[i]; //(i + 1) + ' ' + opciones[i];
        document.getElementById('marcoJuego').appendChild(optionButton);
    }
}

function removeOptions(arrayElementos) {
    //document.getElementById('counter').textContent = arrayElementos;
    arrayElementos.forEach(function(elemento) {
        elemento.remove();
    });
}

function moreOptions(){
    // opciones.push('WIN', 'WIN', 'WIN', 'DEFEAT');
    if(roundCounter === 6) opciones = ['x 0.3 KG','x 0.3 KG', 'x 0.4 KG', 'x 0.4 KG', 'x 0 KG', 'x 0 KG'];
    else if(roundCounter === 11) opciones = ['x 0.3 KG','x 0.4 KG', 'x 0.4 KG', 'x 0.6 KG', 'x 0 KG', 'x 0 KG', 'x 0 KG', 'x 0 KG'];
    else if(roundCounter === 16) opciones = ['x 0.4 KG','x 0.4 KG', 'x 0.6 KG', 'x 0.7 KG', 'x 0 KG', 'x 0 KG', 'x 0 KG', 'x 0 KG', 'x 0 KG', 'x 0 KG'];
    opciones.sort(() => Math.random() - 0.5);
}

function checkOption(){
    if(event.target.textContent === 'x 0.3 KG'){
        winings = (winings + document.getElementById('amount').value * 0.3);
    } else if(event.target.textContent === 'x 0.4 KG'){
        winings = (winings + document.getElementById('amount').value * 0.4);
    } else if(event.target.textContent === 'x 0.6 KG'){
        winings = (winings + document.getElementById('amount').value * 0.6);
    } else if(event.target.textContent === 'x 0.7 KG'){
        winings = (winings + document.getElementById('amount').value * 0.7);
    } else {
        winings = 0;
        cierre = true;
        setTimeout(() => {location.reload();}, 2000);
    }
    KGs.textContent = ': ' + winings.toFixed(1);
}

function prob_acierto(opciones, eventoDeseado){
    const eventosDeseados = opciones.filter(opcion => opcion === eventoDeseado);
    return eventosDeseados.length / opciones.length;
}

function showRules(){
    Swal.fire({
        title: '¡BIENVENIDO!',
        width: 600,
        height: 700,
        html: "<div>" +
            " <strong><h3 style='text-decoration: underline; text-align: center' >Reglas del juego:</h3></strong>" +
            "<strong>1.</strong> Se ha de elegir una de las cartas mostradas." +
            "<br><strong>2.</strong> Hay 2 tipos decartas: Derrota y Multiplicador de apuesta (x ??? KC)." +
            "<br><strong>3.</strong> Tendrá la opción de retirar las ganancias cada 5 rondas." +
            "<br><strong>4.</strong> Además, cada 5 rondas disminuirá la probabilidad de acierto." +
            "<br><strong>5.</strong> A partir de la ronda 15 la probabilidad de acierto se mantendrá." +
            "<br><strong>6.</strong> Si necesita consultar las probabilidades, haga click en el boton de porcentajes." +
            "</div>",
        confirmButtonText: '¡QUIERO APOSTAAAAARRR!',
        confirmButtonColor: 'darkgoldenrod',
        backdrop: `rgba(0,0,0,0.5)`,
        allowOutsideClick: true,
        allowEscapeKey: true,
        customClass: {
            confirmButton: 'custom-button',
            htmlContainer: 'custom-container'
          },
    });
}

function showPercent(){
    Swal.fire({
        title: 'Porcentajes de acierto',
        width: 600,
        height: 700,
        html: "<div>" +
            "<br><strong>1.</strong> De las rondas 1 - 5: <strong>75%</strong>." +
            "<br><br><strong>2.</strong> De las rondas 5 - 10: <strong>67%</strong>." +
            "<br><br><strong>3.</strong> De las rondas 10 - 15: <strong>50%</strong>." +
            "<br><br><strong>4.</strong> De las rondas 15 - ∞: <strong>40%</strong>." +
            "</div>",
        confirmButtonText: '¡VER ESTO ES DE CAGAOS!',
        confirmButtonColor: 'darkgoldenrod',
        backdrop: `rgba(0,0,0,0.5)`,
        allowOutsideClick: true,
        allowEscapeKey: true,
        customClass: {
            confirmButton: 'custom-button',
            htmlContainer: 'custom-container'
          },
    });
}

function withdraw(){
    if(!bloqueo) {
        agregarDinero();
        Swal.fire({
            title: 'Saliste gay',
            width: 600,
            height: 700,
            confirmButtonText: '¡SIP, Y QUIERO MÁS!',
            confirmButtonColor: 'darkgoldenrod',
            backdrop: `rgba(0, 0, 0, 0.5)`,
            allowOutsideClick: true,
            allowEscapeKey: true,
            customClass: {
                confirmButton: 'custom-button',
                htmlContainer: 'custom-container'
            },
        }).then(() => {location.reload();});
    }
}

function retirarDinero() {
    var monto = betAmount;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + monto);
}

// funcion para agregar el dinero ganado de la partida
function agregarDinero() {
    var monto = winings;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);
}

// Start the game
//startGame();

// boton de la toolbar de marcha atras
var bontonAtras = document.querySelector('.back');
// funcion para ir a la ventana de atras
function volverAtras(){document.location.href = '/Juegos/Indice_cartas';}