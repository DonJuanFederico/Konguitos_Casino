// Obtén los valores de Capitan desde el div oculto
var capitanValue = document.getElementById('valoresGashapon').getAttribute('data-capitan');
// Ahora, puedes hacer lo que quieras con el valor de Capitan
console.log('Valor de Capitan:', capitanValue);
console.log(VALORES);
// gashapon.js
var gashaponValue = parseFloat(document.querySelector('#valoresGashapon').textContent);

// Convierte la cadena JSON a un objeto JavaScript
console.log('Valores de Gashapon:', gashaponValue);
var dinero = parseFloat(document.querySelector('#monedasUsuario').textContent);
console.log('Dinero del usuario:', dinero);

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
        {value: 500, probability: 0.01}, //2% probability
        {value: 100, probability: 0.025},  //5% probability
        {value: 50, probability: 0.05},  //10% probability
        {value: 10, probability: 0.155},  //15% probability
        {value: 5, probability: 0.30},   //25
        {value: 2, probability: 0.40},
        {name: "pirata", probability: 0.01},
        {name: "astronauta", probability: 0.01},
        {name: "rey", probability: 0.01},
        {name: "capitan", probability: 0.01},
        {name: "tigre", probability: 0.01},
        {name: "vikingo", probability: 0.01}
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
                var recompensa = rewards[i];

                if (recompensa.value) {
                    // Si es un valor monetario, simplemente actualizar el dinero del usuario
                    premio = recompensa.value;
                    actualizarDineroUsuario(premio);
                    agregarDinero();
                    alert("¡Has ganado una recompensa: " + recompensa.value + "KC!");
                } else if (recompensa.name) {
                    // Si es un avatar, realizar acciones específicas para el tipo de avatar
                    manejarAvatar(recompensa.name);
                    alert("¡Has ganado una recompensa: Avatar " + recompensa.name + "!");
                }

                break;
            }
        }
    }

    // Iniciar la rotación de la imagen
    changeImage();

    // Detener la rotación después de 2.1 segundos (2100 milisegundos)
    setTimeout(stopRotation, 2100);
}

function manejarAvatar(tipoAvatar) {
    // Realizar acciones específicas para cada tipo de avatar
    switch (tipoAvatar) {
        case "pirata":
            activarColumnaGashapon(id_usuario, pirata);
            break;
        case "astronauta":
            activarColumnaGashapon(id_usuario, astronauta);
            break;
        case "rey":
            activarColumnaGashapon(id_usuario, rey);
            break;
        case "capitan":
            activarColumnaGashapon(id_usuario, capitan);
            break;
        case "tigre":
            activarColumnaGashapon(id_usuario, tigre);
            break;
        case "vikingo":
            activarColumnaGashapon(id_usuario, vikingo);
            break;
        default:
            // Acciones por defecto o manejar otros avatares si es necesario
            break;
    }
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

function activarColumnaGashapon(id_usuario, columna) {
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/update_columna_gashapon", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id_usuario=" + id_usuario + "&columna=" + columna);
}








