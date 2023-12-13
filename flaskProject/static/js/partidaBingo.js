//Esto es como la vista del cliente

var anfitrion = false;
var socket = io();
var jugadoresRestantes = 1;
var usuariosEntrados = [];

/***

                                        ESTO LUEGO HAY QUE CAMBIARLO

 ***/
let room = "Lounge";

document.addEventListener("DOMContentLoaded", () =>{

    fetch('/obtener_carton')
        .then(response => response.json())
        .then(data => {
            const stringCarton = data.carton;
            const valores = stringCarton.split(',').map(valor => valor.replace(/\[|\]/g, '').trim());
            const spans = document.querySelectorAll('#carton > div > span');

            // Recorrer los spans y rellenarlos con los valores del array
            spans.forEach((span, index) => {
                if (valores[index] !== '\"\"' && valores[index]>0){
                    span.textContent = valores[index];
                } else {
                    span.textContent = "";
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener el cartón:', error);
        });

    joinRoom("Lounge");
    socket.on("message", data => {
        //console.log(`Message received: ${data}`)
        const p = document.createElement("p");
        const span_username = document.createElement("span");
        const span_timestamp = document.createElement("span");
        const br = document.createElement("br");
        if(data.username){
            span_username.innerHTML = data.username;
            span_timestamp.innerHTML = data.time_stamp;
            p.innerHTML = span_username.outerHTML + " ha dicho: " + br.outerHTML + data.msg + br.outerHTML + span_timestamp.outerHTML;
            document.querySelector("#display-message-section").append(p);
        } else{
            printSysMsg(data.msg);
            if(anfitrion && !usuariosEntrados.includes(data.nuevo_usuario)){
                usuariosEntrados.push(data.nuevo_usuario);
                jugadoresRestantes--;
                empezarPartida();
            }
        }
    });

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

    document.querySelector("#send-message").onclick = () => {
        socket.send({"msg" : document.querySelector("#user-message").value, "username": username, "room": room});
        document.querySelector("#user-message").value = "";
    }
})

function joinRoom(room){
    //Emit ya que es personalizado, y pasando los dos valores que necesita
    socket.emit("join", {"username" : username, "room": room});
    document.querySelector("#display-message-section").innerHTML = "";
    document.querySelector("#user-message").focus();
}

function printSysMsg(msg){
    const p = document.createElement("p");
    p.innerHTML = msg;
    document.querySelector("#display-message-section").append(p);
}

function empezarPartida(){
    if (jugadoresRestantes === 0) {
        let numeros_elegidos = sacarNumeros()
        socket.emit("empezar", { "room": room, "array_numeros": numeros_elegidos });
    }else {
        socket.emit("esperando", { "room": room, "jugadoresRestantes": jugadoresRestantes });
    }
}

function sacarNumeros() {
  let numerosOrdenados = [];
  for (let i = 1; i <= 90; i++) {
    numerosOrdenados.push(i);
  }
  let numerosAleatorios = [];
  while (numerosOrdenados.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * numerosOrdenados.length);
    numerosAleatorios.push(numerosOrdenados[indiceAleatorio]);
    numerosOrdenados.splice(indiceAleatorio, 1);
  }
  return numerosAleatorios;
}

primeroFila = true;
primeroDobleFila = true;
primeroBingo = true;
fila1 = 0;
fila2= 0;
fila3=0;

let numeros = Array.from({ length: 90 }, (_, index) => index + 1);

/*Esta funcion solo el anfitrion*/
let numeroSeleccionado;

socket.on("numeroRecibido", data => {
    numeroSeleccionado = data.resultado;
});

socket.on("numeros_bingo", data => {
    mostrarNumerosRapido(data.numeros_mostrar_bingo);
});

function mostrarNumerosRapido(array) {
    if(array.length > 0) {
        const spanNumero = document.getElementById("numeroSeleccionado");
        const tiempoVisualizacion = 4; // Tiempo de visualización de números en segundos
        const tiempoEspera = 3; // Tiempo de espera entre visualizaciones en segundos

        const intervalo = setInterval(() => {
            const numeroAleatorio = Math.floor(Math.random() * 90) + 1;
            spanNumero.textContent = numeroAleatorio;
        }, 100); // Intervalo de actualización rápida

        setTimeout(() => {
            clearInterval(intervalo);
            spanNumero.textContent = Math.floor(Math.random() * 90) + 1;
            const spans = document.querySelectorAll('#carton > div > span');
            let iteracion = 0;
            spanNumero.textContent = array[0];

            spans.forEach((span) => {
                const valor = parseInt(span.textContent.trim(), 10);
                if (valor === parseInt(array[0], 10)) {
                    span.parentElement.style.backgroundColor = "red"; // Cambiar el fondo del span a rojo si coincide con el número generado
                    if (iteracion < 9) {
                        fila1++;
                    } else if (iteracion >= 9 && iteracion < 18) {
                        fila2++;
                    } else {
                        fila3++;
                    }
                    if ((fila1 === 5 || fila2 === 5 || fila3 === 5) && primeroFila) {
                        alert("Hizo fila");
                        primeroFila = false;
                    }
                    if ((((fila1 + fila2) === 10) || ((fila1 + fila3) === 10) || ((fila2 + fila3) === 10)) && primeroDobleFila) {
                        alert("Hizo doble fila");
                        primeroDobleFila = false;
                    }
                    if ((fila1 + fila2 + fila3 === 15) && primeroBingo) {
                        alert("Bingo");
                        primeroBingo = false;
                    }
                }
                iteracion++;
            });
            array.shift();
            setTimeout(() => {
                mostrarNumerosRapido(array);
            }, tiempoEspera * 1000);
        }, (tiempoVisualizacion + tiempoEspera) * 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let msg = document.querySelector("#user-message");
    msg.addEventListener("keyup", event => {
        event.preventDefault();
        if(event.keyCode === 13){
            document.querySelector("#send-message").click();
        }
    })
})
