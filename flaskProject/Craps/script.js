let balance = 20;


let bets = {
    lineaDePase: 0,
    barraDeNoPase: 0,
    gabelaAFavor: 0,
    gabelaEnContra: 0,
    numeroPorVenir: 0
};

let tipoApuesta = 0; // Inicialmente, no hay ninguna apuesta seleccionada

function placeBet(betType) {
    if (balance > 0) {
        if (tipoApuesta === 0) {
            // Si no hay apuesta seleccionada, permite hacer una apuesta nueva
            bets[betType]++;
            balance--;
            tipoApuesta = betType;
            updateBalance();
            updateBets();
        } else if (tipoApuesta === betType) {
            // Si la apuesta seleccionada es la misma, aumenta la apuesta existente
            bets[betType]++;
            balance--;
            updateBalance();
            updateBets();
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

function updateBets() {
    const cantidadApostada = bets[tipoApuesta] || 0;
    document.getElementById("bet").textContent = `${cantidadApostada} monedas`;
    document.getElementById("current-bet-type").textContent = tipoApuesta;
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
    if (tipoApuesta === "lineaDePase") {
        if (puntoActual === 0) {
            // Si no hay punto actual, comprueba si se gana o pierde directamente
            if (resultado === 7 || resultado === 11) {
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Ganaste la apuesta de Línea de Pase.");
                balance += bets.lineaDePase * 2; // Se duplica la apuesta
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
                balance += bets.lineaDePase * 2; // Se duplica la apuesta
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
    if (tipoApuesta === "barraDeNoPase") {
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
                balance += bets.lineaDePase * 2; // Se duplica la apuesta
                betEnded();
            } else if (resultado === 12){
                document.getElementById("punto-actual").textContent = "Punto actual: Ninguno";
                document.getElementById("punto-actual").style.color = "black"; // Restablece el color
                alert("Empataste la apuesta de Barra de no Pase.");
                balance += bets.lineaDePase; // Se devuelve la cantidad apostada
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
                balance += bets.lineaDePase * 2; // Se duplica la apuesta
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
    bets[tipoApuesta] = 0;
    tipoApuesta = 0; // Se reinicia el tipo de apuesta
    updateBalance();
    updateBets();
}



