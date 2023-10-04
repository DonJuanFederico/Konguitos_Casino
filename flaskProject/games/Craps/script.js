let balance = 20;


let primaryBets = {
    lineaDePase: 0,
    barraDeNoPase: 0
};

let secondaryBets = {
    gavelaAFavor: 0,
    gavelaEnContra: 0,
    numeroPorVenir: 0
};


let tipoApuestaP = "Ninguna"; // Inicialmente, no hay ninguna apuesta seleccionada
let tipoApuestaS = "Ninguna";

function placePrimaryBet(betType) {
    if (balance > 0) {
        if (tipoApuestaP === "Ninguna") {
            // Si no hay apuesta seleccionada, permite hacer una apuesta nueva
            primaryBets[betType]++;
            balance--;
            tipoApuestaP = betType;
            updateBalance();
            updatePrimaryBets();
        } else if (tipoApuestaP === betType) {
            // Si la apuesta seleccionada es la misma, aumenta la apuesta existente
            primaryBets[betType]++;
            balance--;
            updateBalance();
            updatePrimaryBets();
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
                secondaryBets[betType]++;
                balance--;
                tipoApuestaS = betType;
                updateBalance();
                updateSecondaryBets();
            } else {
                alert("Debes hacer la apuesta principal correspondiente antes de realizar esta apuesta secundaria.");
            }
        } else if (tipoApuestaS === betType) {
            // Si la apuesta seleccionada es la misma, aumenta la apuesta existente
            secondaryBets[betType]++;
            balance--;
            updateBalance();
            updateSecondaryBets();
        } else {
            alert("Termina la apuesta actual antes de hacer una nueva.");
        }
    } else {
        alert("No tienes suficientes monedas para apostar.");
    }
}



function updateBalance() {
    document.getElementById("balance").textContent = `${balance} monedas`;
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

let puntoActual = 0; // Variable para el punto actual (inicialmente 0)

function rollDice() {
    // Simulación del lanzamiento de los dados (genera un número entre 2 y 12)
    const dado1 = Math.floor(Math.random() * 6) + 1;
    const dado2 = Math.floor(Math.random() * 6) + 1;
    const resultado = dado1 + dado2;

    document.getElementById("dice1").textContent = dado1;
    document.getElementById("dice2").textContent = dado2;
    document.getElementById("result").textContent = `Resultado: ${resultado}`;

    //Apuesta "Línea de Pase"
    if (tipoApuestaP === "lineaDePase") {
        if (puntoActual === 0) {
            // Si no hay punto actual, comprueba si se gana o pierde directamente
            if (resultado === 7 || resultado === 11) {
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Ganaste la apuesta de Línea de Pase.");
                balance += primaryBets.lineaDePase * 2; // Se duplica la apuesta
                betEnded();
            } else if (resultado === 2 || resultado === 3 || resultado === 12) {
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Perdiste la apuesta de Línea de Pase.");
                betEnded();
            } else {
                // Se establece el punto
                puntoActual = resultado;
                document.getElementById("punto-actual").textContent = `Punto actual: ${puntoActual}`;
                document.getElementById("punto-actual").style.color = "green"; // Cambia el color
            }
        } else {
            // Si hay un punto actual, verifica si se gana o pierde
            if (resultado === puntoActual) {
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Ganaste la apuesta de Línea de Pase.");
                balance += primaryBets.lineaDePase * 2; // Se duplica la apuesta
                puntoActual = 0; // Se reinicia el punto
                betEnded();
            } else if (resultado === 7) {
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Perdiste la apuesta de Línea de Pase.");
                puntoActual = 0; // Se reinicia el punto
                betEnded();
            }
        }

        
        
    }
    
    //Apuesta Barra No Pase
    if (tipoApuestaP === "barraDeNoPase") {
        if (puntoActual === 0) {
            // Si no hay punto actual, comprueba si se gana o pierde directamente
            if (resultado === 7 || resultado === 11) {
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Perdiste la apuesta de Barra de no Pase.");
                betEnded();
            } else if (resultado === 2 || resultado === 3) {
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Ganaste la apuesta de Barra de no Pase.");
                balance += primaryBets.barraDeNoPase * 2; // Se duplica la apuesta
                betEnded();
            } else if (resultado === 12){
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Empataste la apuesta de Barra de no Pase.");
                balance += primaryBets.barraDeNoPase; // Se devuelve la cantidad apostada
                betEnded();
            } else {
                // Se establece el punto
                puntoActual = resultado;
                document.getElementById("punto-actual").textContent = `Punto actual: ${puntoActual}`;
                document.getElementById("punto-actual").style.color = "green"; // Cambia el color
            }
        } else {
            // Si hay un punto actual, verifica si se gana o pierde
            if (resultado === puntoActual) {
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Perdiste la apuesta de Barra de no Pase.");
                puntoActual = 0; // Se reinicia el punto
                betEnded();
            } else if (resultado === 7) {
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Ganaste la apuesta de Barra de no Pase.");
                balance += primaryBets.barraDeNoPase * 2; // Se duplica la apuesta
                puntoActual = 0; // Se reinicia el punto
                betEnded();
            }
        }
        
    }
    
    //Apuesta gavela a favor
    //Apuesta gavela en contra
    //Apuesta número por venir
}

function betEnded(){ // Se actualiza el saldo y las apuestas
    primaryBets[tipoApuestaP] = 0;
    tipoApuestaP = "Ninguna"; // Se reinicia el tipo de apuesta principal
    updateBalance();
    updatePrimaryBets();
}



