let balance = parseFloat(document.getElementById('monedas').textContent);
let betAmount;

let primaryBets = {
    lineaDePase: 0,
    barraDeNoPase: 0
};

let secondaryBets = {
    gabelaAFavor: 0,
    gabelaEnContra: 0,
};

let puntoActual = 0; // Variable para el punto actual (inicialmente 0)

let tipoApuestaP = "Ninguna"; // Inicialmente, no hay ninguna apuesta seleccionada
let tipoApuestaS = "Ninguna";

function placePrimaryBet(betType) {
    if (balance > 0) {
        if (tipoApuestaP === "Ninguna") {
            // Si no hay apuesta seleccionada, permite hacer una apuesta nueva
            primaryBets[betType] = prompt("Introduzca la cantidad a apostar:");
            if (primaryBets[betType] > 0 && primaryBets[betType] < balance){
                betAmount = primaryBets[betType];
                retirarDinero(betAmount);
                tipoApuestaP = betType;
                updatePrimaryBets();
            }
        } else {
            alert("Termina la apuesta actual antes de hacer una nueva.");
        }
    } else {
        alert("No tienes suficientes monedas para apostar.");
    }
}

function placeSecondaryBet(betType) {
    if (balance > 0) {
        if (tipoApuestaS === "Ninguna") {
            // Si no hay apuesta seleccionada, permite hacer una apuesta nueva
            if ((betType === "gabelaAFavor" && tipoApuestaP === "lineaDePase") ||
                (betType === "gabelaEnContra" && tipoApuestaP === "barraDeNoPase")) {
                if (puntoActual !== 0){
                    secondaryBets[betType] = prompt("Introduzca la cantidad a apostar:");
                    if (secondaryBets[betType] > 0 && secondaryBets[betType] < balance){
                        betAmount = secondaryBets[betType];
                        retirarDinero(betAmount);
                        tipoApuestaS = betType;
                        updateSecondaryBets();
                    }
                } else {
                    alert("Es necesario un punto para hacer esta apuesta.");
                }
            } else {
                alert("Debes hacer la apuesta principal correspondiente antes de realizar esta apuesta secundaria.");
            }
        } else {
            alert("Termina la apuesta actual antes de hacer una nueva.");
        }
    } else {
        alert("No tienes suficientes monedas para apostar.");
    }
}



function updateBalance() {
    document.getElementById("monedas").textContent = `${balance}`;
}

function updatePrimaryBets() {
    const cantidadApostada = primaryBets[tipoApuestaP] || 0;
    document.getElementById("bet").textContent = `${cantidadApostada} monedas`;
    document.getElementById("current-bet-type").textContent = tipoApuestaP;
}

function updateSecondaryBets() {
    const cantidadApostada = secondaryBets[tipoApuestaS] || 0;
    document.getElementById("bet2").textContent = `${cantidadApostada} monedas`;
    document.getElementById("current-bet-type2").textContent = tipoApuestaS;
}



function rollDice() {
    if (tipoApuestaP === "Ninguna"){
        alert("Entiendo tu impaciencia por jugar, pero deberías apostar primero");
    } else {
        // Simulación del lanzamiento de los dados (genera un número entre 2 y 12)
        const dado1 = Math.floor(Math.random() * 6) + 1;
        const dado2 = Math.floor(Math.random() * 6) + 1;
        const resultado = dado1 + dado2;



        document.getElementById("dice1").src = `/static/images/dados/${dado1}.png`;
        document.getElementById("dice2").src = `/static/images/dados/${dado2}.png`;
        document.getElementById("result").textContent = `Resultado: ${resultado}`;

        //Apuesta gabela a favor
        if (tipoApuestaS === "gabelaAFavor") {
            if (puntoActual === 4 || puntoActual === 10) {
                if (resultado === puntoActual) {
                    alert("Ganaste la apuesta de Gabela a Favor.");
                    agregarDinero(betAmount * 3); // Se paga 2:1
                    sBetEnded();
                }
            } else if (puntoActual === 5 || puntoActual === 9) {
                if (resultado === puntoActual) {
                    alert("Ganaste la apuesta de Gabela a Favor.");
                    agregarDinero(betAmount * 2.5); // Se paga 3:2
                    sBetEnded();
                }

            } else if (puntoActual === 6 || puntoActual === 8) {
                if (resultado === puntoActual) {
                    alert("Ganaste la apuesta de Gabela a Favor.");
                    agregarDinero(betAmount * 2.2); // Se paga 6:5
                    sBetEnded();
                }
            }
        }

        //Apuesta línea de pase
        if (tipoApuestaP === "lineaDePase") {
            if (puntoActual === 0) {
                // Si no hay punto actual, comprueba si se gana o pierde directamente
                if (resultado === 7 || resultado === 11) {
                    document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                    document.getElementById("punto-actual").style.color = "white"; // Restablece el color
                    alert("Ganaste la apuesta de Línea de Pase.");
                    agregarDinero(betAmount * 2); // Se paga 1:1
                    betEnded();
                } else if (resultado === 2 || resultado === 3 || resultado === 12) {
                    document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                    document.getElementById("punto-actual").style.color = "white"; // Restablece el color
                    alert("Perdiste la apuesta de Línea de Pase.");
                    betEnded();
                } else {
                    // Se establece el punto
                    puntoActual = resultado;
                    document.getElementById("punto-actual").textContent = `Punto actual: ${puntoActual}`;
                    document.getElementById("punto-actual").style.color = "pink"; // Cambia el color
                }
            } else {
                // Si hay un punto actual, verifica si se gana o pierde
                if (resultado === puntoActual) {
                    document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                    document.getElementById("punto-actual").style.color = "white"; // Restablece el color
                    alert("Ganaste la apuesta de Línea de Pase.");
                    agregarDinero(betAmount * 2); // Se paga 1:1
                    puntoActual = 0; // Se reinicia el punto
                    betEnded();
                } else if (resultado === 7) {
                    document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                    document.getElementById("punto-actual").style.color = "white"; // Restablece el color
                    alert("Perdiste la apuesta de Línea de Pase.");
                    if(tipoApuestaS === "gabelaAFavor"){
                        alert("Perdiste la apuesta de Gabela a Favor.");
                    }
                    puntoActual = 0; // Se reinicia el punto
                    betEnded();
                    sBetEnded();
                }
            }
        }

        //Apuesta gabela en contra
        if (tipoApuestaS === "gabelaEnContra") {
            if (puntoActual === 4 || puntoActual === 10) {
                if (resultado === 7) {
                    alert("Ganaste la apuesta de Gabela en Contra.");
                    agregarDinero(betAmount * 1.5); // Se paga 0.5:1
                    sBetEnded();
                }
            } else if (puntoActual === 5 || puntoActual === 9) {
                if (resultado === 7) {
                    alert("Ganaste la apuesta de Gabela en Contra.");
                    agregarDinero(betAmount * 1.66); // Se paga 0.66:1
                    sBetEnded();
                }

            } else if (puntoActual === 6 || puntoActual === 8) {
                if (resultado === 7) {
                    alert("Ganaste la apuesta de Gabela en Contra.");
                    agregarDinero(betAmount * 1.83); // Se paga 0.83:1
                    sBetEnded();
                }
            }
        }

        //Apuesta barra no pase
        if (tipoApuestaP === "barraDeNoPase") {
            if (puntoActual === 0) {
                // Si no hay punto actual, comprueba si se gana o pierde directamente
                if (resultado === 7 || resultado === 11) {
                    document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                    document.getElementById("punto-actual").style.color = "white"; // Restablece el color
                    alert("Perdiste la apuesta de Barra de no Pase.");
                    betEnded();
                } else if (resultado === 2 || resultado === 3) {
                    document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                    document.getElementById("punto-actual").style.color = "white"; // Restablece el color
                    alert("Ganaste la apuesta de Barra de no Pase.");
                    agregarDinero(betAmount * 2); // Se paga 1:1
                    betEnded();
                } else if (resultado === 12){
                    document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                    document.getElementById("punto-actual").style.color = "white"; // Restablece el color
                    alert("Empataste la apuesta de Barra de no Pase.");
                    agregarDinero(betAmount); // Se devuelve la cantidad apostada
                    betEnded();
                } else {
                    // Se establece el punto
                    puntoActual = resultado;
                    document.getElementById("punto-actual").textContent = `Punto actual: ${puntoActual}`;
                    document.getElementById("punto-actual").style.color = "pink"; // Cambia el color
                }
            } else {
                // Si hay un punto actual, verifica si se gana o pierde
                if (resultado === puntoActual) {
                    document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                    document.getElementById("punto-actual").style.color = "white"; // Restablece el color
                    alert("Perdiste la apuesta de Barra de no Pase.");
                    if (tipoApuestaS === "gabelaEnContra"){
                        alert("Perdiste la apuesta de Gabela en Contra.");
                    }

                    puntoActual = 0; // Se reinicia el punto
                    betEnded();
                    sBetEnded();
                } else if (resultado === 7) {
                    document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                    document.getElementById("punto-actual").style.color = "white"; // Restablece el color
                    alert("Ganaste la apuesta de Barra de no Pase.");
                    agregarDinero(betAmount * 2); // Se paga 1:1
                    puntoActual = 0; // Se reinicia el punto
                    betEnded();
                }
            }

        }
    
    }
}

function betEnded(){
    primaryBets[tipoApuestaP] = 0;
    tipoApuestaP = "Ninguna"; // Se reinicia el tipo de apuesta principal
    updateBalance();
    updatePrimaryBets();
}

function sBetEnded(){
    secondaryBets[tipoApuestaS] = 0;
    tipoApuestaS = "Ninguna"; // Se reinicia el tipo de apuesta secundaria
    updateBalance();
    updateSecondaryBets();
}

document.getElementById("masMonedas").addEventListener("click", function () {
        window.location.href = "/dinero/";
});

function agregarDinero(monto) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Verificar la respuesta del servidor y actualizar el saldo en el cliente si es necesario
            if (xhr.status === 200) {
                balance += monto;
                updateBalance(); // Actualizar la visualización del saldo en la interfaz
            } else {
                // Manejar errores si la solicitud al servidor falla
                console.error('Error al agregar dinero.');
            }
        }
    };
}

function retirarDinero(monto) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + monto);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Verificar la respuesta del servidor y actualizar el saldo en el cliente si es necesario
            if (xhr.status === 200) {
                balance -= monto;
                updateBalance(); // Actualizar la visualización del saldo en la interfaz
            } else {
                // Manejar errores si la solicitud al servidor falla
                console.error('Error al retirar dinero.');
            }
        }
    };
}

// boton de la toolbar de marcha atras
var bontonAtras = document.querySelector('.back');
// funcion para ir a la ventana de atras
function volverAtras(){document.location.href = '/Juegos/Indice_Dados';}


