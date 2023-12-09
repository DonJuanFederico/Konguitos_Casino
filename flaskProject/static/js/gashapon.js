function girar() {
    // Hide the ruedecilla element
    document.querySelector('#ruedecilla').style.display = "none";
    apuesta = 10;
    actualizarDineroUsuario(-apuesta)
    retirarDinero()
    var imagenElement = document.getElementById("GachaponWey");
    var imageSources = [
        "/static/images/gashapon/1Gachapon.png",
        "/static/images/gashapon/2Gachapon.png",
        "/static/images/gashapon/3Gachapon.png",
        "/static/images/gashapon/4Gachapon.png",
        "/static/images/gashapon/3Gachapon.png",
        "/static/images/gashapon/2Gachapon.png",
        "/static/images/gashapon/1Gachapon.png"
    ];

    var rewards = [
        { value: 500, probability: 0.01 }, //2% probability
        { value: 100, probability: 0.025 },  //5% probability
        { value: 50, probability: 0.05 },  //10% probability
        { value: 10, probability: 0.165 },  //15% probability
        { value: 5, probability: 0.30 },   //25
        { value: 2, probability: 0.45 }
    ];

    var currentIndex = 0;
    var rotationTimeout;

    function changeImage() {
        imagenElement.src = imageSources[currentIndex];
        currentIndex = (currentIndex + 1) % imageSources.length; // Circular rotation
        rotationTimeout = setTimeout(changeImage, 300); // Change image every 300 milliseconds
    }

    function stopRotation() {
        clearTimeout(rotationTimeout);
        document.querySelector('#ruedecilla').style.display = "block";
        mostrarRecompensa();
    }

    // Función para mostrar la recompensa
    function mostrarRecompensa() {
        var randomNumber = Math.random(); // Generar un número aleatorio entre 0 y 1

        var accumulatedProbability = 0;
        for (var i = 0; i < rewards.length; i++) {
            accumulatedProbability += rewards[i].probability;
            if (randomNumber <= accumulatedProbability) {
                premio = rewards[i].value;
                actualizarDineroUsuario(premio)
                agregarDinero()
                alert("¡Has ganado una recompensa: " + rewards[i].value + "KC!");
                break;
            }
        }
    }

    // Iniciar la rotación de la imagen
    changeImage();

    // Detener la rotación después de 2.1 segundos (2100 milisegundos)
    setTimeout(stopRotation, 2100);
}

function actualizarDineroUsuario(cantidad) {
    let dineroUsuarioElement = document.querySelector('#monedasUsuario');
    dineroUsuarioElement.textContent = parseFloat(dineroUsuarioElement.textContent) + cantidad;
}

function retirarDinero() {
    // MONTO EN ESTE CASO ES VALOR DE LA APUESTA
    var monto = apuesta;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + monto);
}

function agregarDinero() {
    // MONTO EN ESTE CASO ES VALOR DE LO GANADO (MIRAR TRAGAPERRAS PARA VERLO BIEN)
    var monto = premio;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_ganancias", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);
}







