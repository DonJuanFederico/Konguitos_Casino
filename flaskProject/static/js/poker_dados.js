let dadosBloqueados = {
    dice1: false,
    dice2: false,
    dice3: false,
    dice4: false,
    dice5: false
};

var anfitrion = false;
var socket = io();
//Partidas de 5 entonces: jugadoresRestantes = 4
var jugadoresRestantes = 4;
var jugadoresTotales = 5;
var usuariosEntrados = [];

let valoresDados = [0, 0, 0, 0, 0];
let numeroTiros = 3;
var ordenUsuarios =[]
var ordenValores = []

document.addEventListener("DOMContentLoaded", () =>{

    document.getElementById("miBoton").style.display = 'none';

    joinRoom(room);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/buscar_anfitrion", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&nombre_usuario=" + username);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            if (data.resultado === true) {
                anfitrion = true; // Establecer la variable anfitrion como true si la respuesta es true
            }
        }
    };
    socket.on("message", data => {
        if (anfitrion) {
            usuariosEntrados.push(data.nuevo_usuario);
            jugadoresRestantes--;
            mostrarRestoJugadores();
        }
    });

    socket.on("respuestaAnfitrion", data => {
        if(anfitrion){
            Swal.fire({
                html: `<div style="font-size: 30px;">ESPERANDO</div>`,
                imageUrl: `/static/images/pokerDados/jugadoresRestantes${jugadoresRestantes}.png`,
                showCancelButton: false,
                showConfirmButton: false,
                backdrop: `rgb(181, 245, 156)`,
                background: `none`,
                customClass: {
                    container: 'custom-swal-container',
                    image: 'custom-swal-image'
                }
            });
        }
    });

    socket.on("cambiarUsuarios", data =>{
        if(!anfitrion){
            jugadoresRestantes = data.jugadorFaltan;
            mostrarRestoJugadores()
        }
    })

    function joinRoom(room){
        //Emit ya que es personalizado, y pasando los dos valores que necesita
        socket.emit("joinPokerDados", {"username" : username, "room": room});
    }

    socket.on("mostrarResultado", data => {
        var traduccion
        if (data.resultadoAlmacenado === 8) {
            traduccion = "Repóker";
        } else if (data.resultadoAlmacenado === 7) {
            traduccion = "Póker";
        } else if (data.resultadoAlmacenado === 6) {
            traduccion = "Full";
        } else if (data.resultadoAlmacenado === 3) {
            traduccion = "Trío";
        } else if (data.resultadoAlmacenado === 2) {
            traduccion = "Doble Pareja";
        } else if (data.resultadoAlmacenado === 1) {
            traduccion = "Pareja";
        } else if (data.resultadoAlmacenado === 5) {
            traduccion = "Escalera Mayor";
        } else if (data.resultadoAlmacenado === 4) {
            traduccion = "Escalera Menor";
        } else {
            traduccion = " nada";
        }
        Swal.fire({
            title: `Ha ganado ${data.nombreAlmacenado} teniendo un ${traduccion}`,
            confirmButtonText: 'Vamos a jugar',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
        document.getElementById("miBoton").style.display = 'block';
        if(username === data.nombreAlmacenado){
            let monedasElement = document.getElementById('monedas');
            let dineroActual = parseInt(monedasElement.textContent);
            let nuevoDinero = dineroActual + 30;
            monedasElement.textContent = nuevoDinero;
        }
    });

    revisarAnfitrion();

    function mostrarRestoJugadores(){
        if(jugadoresRestantes>0 && jugadoresRestantes < 4){
            Swal.fire({
                html: `<div style="font-size: 30px;">ESPERANDO</div>`,
                imageUrl: `/static/images/pokerDados/jugadoresRestantes${jugadoresRestantes}.png`,
                showCancelButton: false,
                showConfirmButton: false,
                backdrop: `rgb(181, 245, 156)`,
                background: `none`,
                customClass: {
                    container: 'custom-swal-container',
                    image: 'custom-swal-image'
                }
            });
        }else if(jugadoresRestantes === 4 || anfitrion){
            if(jugadoresRestantes===0){
                Swal.fire({
                    title: 'Empieza la partida',
                    confirmButtonText: 'Vamos a jugar',
                    confirmButtonColor: '#3085d6',
                    backdrop: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                });
                socket.emit("empezarPokerDados", { "room": room});
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/eliminar_salaPokerDados", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("&nombre_sala=" + room);
            }else {
                socket.emit("actualizarUsuarios", {"room": room, "jugadores_restantes": jugadoresRestantes});
            }
        }else{
            Swal.fire({
                title: 'Empieza la partida',
                confirmButtonText: 'Vamos a jugar',
                confirmButtonColor: '#3085d6',
                backdrop: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
            });

            socket.emit("empezarPokerDados", { "room": room});
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/eliminar_salaPokerDados", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("&nombre_sala=" + room);
        }
    }

    socket.on("abrirBoton", data => {
        document.getElementById("miBoton").style.display = 'block';
    })

    function revisarAnfitrion(){
        let ejecutado = false;

        setTimeout(() => {
            if (!ejecutado && usuariosEntrados.length === 0) {
                ejecutado = true;
                socket.emit("preguntarAnfitrion", {"room": room});
            }
        }, 2000);
    }
})

function toggleBloquearDado(dadoId) {
    const dadoImg = document.getElementById(dadoId);

    if (numeroTiros < 3) {
        dadosBloqueados[dadoId] = !dadosBloqueados[dadoId];

        if (dadosBloqueados[dadoId]) {
            dadoImg.style.border = '2px solid red'; // Cambiar borde a rojo cuando está bloqueado
        } else {
            dadoImg.style.border = 'none'; // Quitar borde cuando se desbloquea
        }
    } else {
        Swal.fire({
            title: 'No puedes bloquear dados antes de comenzar la partida.',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    }
}

function lanzarDados() {
    const betInput = document.getElementById('apuesta');
    betAmount = parseFloat(betInput.value);

    const botonLanzar = document.querySelector('.lanzar-button');

    // Validar si la apuesta es válida (por ejemplo, si es mayor que cero)
    if ((betAmount !== 9)||betAmount > parseFloat(document.getElementById("monedas").textContent) ||betAmount <= 0 || isNaN(betAmount) || !(betAmount - parseFloat(betAmount.toFixed(2)) == 0)) {
        Swal.fire({
            title: 'Ahora mismo la partida cuesta 9 KC, no lo cambie',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#f8361c',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
        return; // Evitar iniciar el juego si la apuesta no es válida
    } else {
        if (numeroTiros === 3) {
            let monedasElement = document.getElementById('monedas');
            let dineroActual = parseInt(monedasElement.textContent);
            let nuevoDinero = dineroActual - 9;
            monedasElement.textContent = nuevoDinero;
        }
        const dadosNoBloqueados = ['dice1', 'dice2', 'dice3', 'dice4', 'dice5'];

        for (let i = 0; i < dadosNoBloqueados.length; i++) {
            const dadoId = dadosNoBloqueados[i];
            if (!dadosBloqueados[dadoId]) {
                const randomNumber = Math.floor(Math.random() * 6) + 1;
                document.getElementById(dadoId).src = `/static/images/dados/${randomNumber}.png`;

                // Actualizar valoresDados con los valores aleatorios obtenidos para cada dado
                const dadoNumero = parseInt(dadoId.slice(-1)) - 1; // Obtener el número del dado del ID
                valoresDados[dadoNumero] = randomNumber;
            }
        }

        const resultado = calcularResultado(valoresDados);
        numeroTiros = numeroTiros -1;
        document.getElementById("result").textContent = `Mano actual: ${resultado}`;
        document.getElementById("throws").textContent = `Tiradas restantes: ${numeroTiros}`;

        if (numeroTiros === 0) {
            //Aquí dar resultados al admin y esperar
            document.getElementById("miBoton").style.display = 'none';
            botonLanzar.disabled = true;
            var resultadoNumerico;
            setTimeout(() => {
                if (resultado === "Repóker"){
                    resultadoNumerico = 8;
                }else if (resultado === "Póker"){
                    resultadoNumerico = 7;
                }else if (resultado === "Full"){
                    resultadoNumerico = 6;
                }else if (resultado === "Trío"){
                    resultadoNumerico = 3;
                }else if (resultado === "Doble Pareja"){
                    resultadoNumerico = 2;
                }else if (resultado === "Pareja"){
                    resultadoNumerico = 1;
                }else if (resultado === "Escalera Mayor"){
                    resultadoNumerico = 5;
                }else if (resultado === "Escalera Menor"){
                    resultadoNumerico = 4;
                }else{
                    resultadoNumerico = 0;
                }
                socket.emit("compartirResultado", {"username" : username, "room": room, "resultado": resultadoNumerico});
                resetGame();
                botonLanzar.disabled = false;
            }, 1000);
        }
    }
}

socket.on("almacenarNumero", data =>{
    if (anfitrion && ordenUsuarios.length !== jugadoresTotales - 1) {
        ordenUsuarios.push(data.nombreAlmacenado);
        ordenValores.push(data.resultadoAlmacenado);
    } else if(anfitrion){
        ordenUsuarios.push(data.nombreAlmacenado);
        ordenValores.push(data.resultadoAlmacenado);

        if (ordenValores.length === jugadoresTotales) {
            let maxIndex = 0;
            let maxValor = ordenValores[0];

            for (let i = 1; i < ordenValores.length; i++) {
                if (ordenValores[i] > maxValor) {
                    maxValor = ordenValores[i];
                    maxIndex = i;
                }
            }
            socket.emit("resultadosRonda", {"username" : ordenUsuarios[maxIndex], "room": room, "resultado": maxValor});
            ordenUsuarios = [];
            ordenValores = [];
        }
    }
});

function calcularResultado(valoresDados) {
    const frecuencias = {};
    for (const valor of valoresDados) {
        frecuencias[valor] = (frecuencias[valor] || 0) + 1;
    }
    const valoresFrecuentes = Object.values(frecuencias);
    const numValoresUnicos = Object.keys(frecuencias).length;

    const esMayor = esEscaleraMayor(valoresDados);
    console.log(esMayor);
    const esMenor = esEscaleraMenor(valoresDados);

    if (valoresFrecuentes.includes(5)) {
        return 'Repóker'; // 5 dados con el mismo valor
    } else if (valoresFrecuentes.includes(4)) {
        return 'Póker'; // 4 dados con el mismo valor
    } else if (valoresFrecuentes.includes(3) && valoresFrecuentes.includes(2)) {
        return 'Full'; // Trío y pareja
    } else if (valoresFrecuentes.includes(3)) {
        return 'Trío'; // 3 dados con el mismo valor
    } else if (valoresFrecuentes.includes(2) && numValoresUnicos === 3) {
        return 'Doble Pareja'; // Dos parejas
    } else if (valoresFrecuentes.includes(2)) {
        return 'Pareja'; // 2 dados con el mismo valor
    } else if (esMayor) {
        return 'Escalera Mayor'; // Escalera mayor (6-5-4-3-2)
    } else if (esMenor) {
        return 'Escalera Menor'; // Escalera menor (5-4-3-2-1)
    } else {
        return 'Nada'; // Ninguna combinación especial
    }
}

function esEscaleraMayor(valoresDados) {
    console.log(valoresDados);
    const escaleraMayor = [2, 3, 4, 5, 6];
    const valoresOrdenados = [...valoresDados].sort((a, b) => a - b);
    console.log(valoresOrdenados);
    return JSON.stringify(valoresOrdenados) === JSON.stringify(escaleraMayor);
}

function esEscaleraMenor(valoresDados) {
    const escaleraMenor = [1, 2, 3, 4, 5];
    const valoresOrdenados = [...valoresDados].sort((a, b) => a - b);
    return JSON.stringify(valoresOrdenados) === JSON.stringify(escaleraMenor);
}

function resetGame(){
    // Desbloquear todos los dados
    for (let i = 1; i <= 5; i++) {
        const dadoId = `dice${i}`;
        dadosBloqueados[dadoId] = false;
        const dadoImg = document.getElementById(dadoId);
        dadoImg.style.border = 'none';
    }

    // Cambiar la imagen de cada dado a la por defecto
    for (let i = 1; i <= 5; i++) {
        const dadoId = `dice${i}`;
        document.getElementById(dadoId).src = `/static/images/dados/0.png`;
    }

    // Reiniciar el contador de tiradas y mostrar el número de tiradas restantes
    numeroTiros = 3;
    document.getElementById("throws").textContent = `Tiradas restantes: ${numeroTiros}`;
    document.getElementById("result").textContent = `Mano actual: Ninguna`;

}

function agregarDinero(monto) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_ganancias", true);
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