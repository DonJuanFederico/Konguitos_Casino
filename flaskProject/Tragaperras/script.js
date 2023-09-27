var imageSources = [
    "Slot1.png",
    "Slot2.png",
    "Slot3.png",
    "Slot4.png",
    "Slot5.png",
    "Slot6.png",
    "Slot7.png"
];

var balance = 100;
var bet;

function updateBalance() {
    document.getElementById("balance").innerHTML = balance;
}

function changeSymbols(row) {
    Array.from(row).forEach(function (img) {
        var randomIndex = Math.floor(Math.random() * imageSources.length); // Cambiar imageSources por el nombre de tu arreglo de rutas de imágenes
        var imageUrl = imageSources[randomIndex];
        img.src = imageUrl; // Cambiar la ruta de la imagen
    });
}


function checkWin() {
    var row2 = document.querySelectorAll(".slot-row")[1].children;
    var message = document.getElementById("balance");
    var button = document.getElementById("spin");

    // Obtener el atributo "src" de las imágenes en la fila 2
    var imgSrc1 = row2[0].src;
    var imgSrc2 = row2[1].src;
    var imgSrc3 = row2[2].src;

    if (imgSrc1 === imgSrc2 && imgSrc2 === imgSrc3) {
        balance += bet * 10;
        message.innerHTML = "¡Enhorabuena! Has ganado. Tu saldo es " + balance;
    } else if (imgSrc1 === imgSrc2 || imgSrc2 === imgSrc3 || imgSrc1 === imgSrc3) {
        balance += bet * 2;
        message.innerHTML = "x2 te ha tocado el nuevo balance es: " + balance;
    } else {
        message.innerHTML = balance + " Nada";
    }

    // Reactivar el botón
    button.disabled = false;
}


function spin() {
    var button = document.getElementById("spin");
    button.disabled = true;
    bet = document.getElementById("bet").value;

    if (balance < bet) {
        // Mostrar un mensaje de alerta
        alert("No tienes suficiente saldo para apostar");
        // Reactivar el botón
        button.disabled = false;
        // No iniciar el intervalo
        return;
    }

    balance -= bet;
    updateBalance();

    var slotRows = document.querySelectorAll(".slot-row");
    var currentInterval = 100;
    var maxInterval = 750;
    var stopInterval = 5000;
    var startTime = Date.now();

    // Función para rotar las filas de símbolos
    // Función para rotar las filas de símbolos
    function rotateSlots() {
        var row1 = document.querySelectorAll(".slot-row")[0].children;
        var row2 = document.querySelectorAll(".slot-row")[1].children;
        var row3 = document.querySelectorAll(".slot-row")[2].children;

        // Mover los símbolos de la fila 1 a la fila 2, y de la fila 2 a la fila 3
        for (var i = 0; i < row1.length; i++) {
            var temp = row1[i].src;
            row3[i].src = row2[i].src;
            row2[i].src = row1[i].src;
            row1[i].src = temp;
        }

        // Asignar nuevos símbolos aleatorios a la fila 3
        changeSymbols(row1);


        // Aumentar el intervalo actual, pero no más que el máximo
        currentInterval += 10;
        if (currentInterval > maxInterval) {
            currentInterval = maxInterval;
        }

        // Programar la próxima rotación, pero detenerla después de un tiempo
        if (Date.now() - startTime < stopInterval) {
            setTimeout(rotateSlots, currentInterval);
        } else {
            checkWin();
        }
    }

    // Iniciar la rotación
    rotateSlots();
}
