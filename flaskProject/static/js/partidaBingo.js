//Esto es como la vista del cliente

var anfitrion = false;
var socket = io();
var jugadoresRestantes = 1;
var usuariosEntrados = [];

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

    joinRoom(room);
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
    cambiarImagenes(data.numeros_mostrar_bingo);
});

function cambiarImagenes(array) {
    const imagen = document.getElementById("imagenBingo");
    let contador = 1;

    const cambioImagen = () => {
        imagen.src = `/static/images/bingo/${contador}.png`;
        if (contador === 6) {
            mostrarNumerosRapido(array);
            setTimeout(() => {
                contador++;
                cambioImagen();
            }, 200);
        } else if(contador !== 11) {
            setTimeout(() => {
                contador++;
                cambioImagen();
            }, 200);
        }
    };
    cambioImagen();
}

hiceFila = true;
hiceDobleFila = true;

function mostrarNumerosRapido(array) {
    if(array.length > 0 && primeroBingo) {
        const spanNumero = document.getElementById("numeroSeleccionado");
        const tiempoVisualizacion = 2;
        const tiempoEspera = 2;

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
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "/agregar_ganancias", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    if ((fila1 === 5 || fila2 === 5 || fila3 === 5) && hiceFila) {
                        hiceFila = false;
                        if(primeroFila){
                            primeroFila = false;
                            //Mandar al resto que ponga primero fila = false
                            //Ingresar dinero
                            xhr.send("&cantidad_a_agregar=" + 10);
                        }
                        socket.emit("fila", {"username" : username, "room": room});
                    }
                    if ((((fila1 + fila2) === 10) || ((fila1 + fila3) === 10) || ((fila2 + fila3) === 10)) && hiceDobleFila) {
                        hiceDobleFila = false;
                        if(primeroDobleFila){
                            primeroDobleFila = false;
                            xhr.send("&cantidad_a_agregar=" + 15);
                        }
                        //Mensaje de hizo fila
                        socket.emit("dobleFila", {"username" : username, "room": room});

                    }
                    if (fila1 + fila2 + fila3 === 15) {
                        if(primeroBingo){
                            xhr.send("&cantidad_a_agregar=" + 50);
                            primeroBingo = false;
                            socket.emit("bingoCompleto", {"username" : username, "room": room});
                        }
                    }
                }
                iteracion++;
            });
            array.shift();
            setTimeout(() => {
                cambiarImagenes(array);
            }, tiempoEspera * 1000);
        }, (tiempoVisualizacion + tiempoEspera) * 1000);
    }
}

socket.on("cambiarFila", data => {
    primeroFila = false;
});

socket.on("cambiarDobleFila", data => {
    primeroDobleFila = false;
});

socket.on("terminarPartida", data => {
    primeroBingo = false;
    if(data.ganador !== username) {
        Swal.fire({
            html: `<div style="font-size: 30px;">Perdiste. ${data.ganador} te robó el bingo </div>`,
            imageUrl: `/static/images/bingo/perderBingo.png`,
            showCancelButton: false,
            showConfirmButton: false,
            backdrop: `rgb(245, 123, 123)`,
            background: `none`,
            customClass: {
                container: 'custom-swal-container',
                image: 'custom-swal-image'
            }
        });
    }else{
        Swal.fire({
            html: `<div style="font-size: 30px;">Felicidades, disfruta el premio!!.</div>`,
            imageUrl: `/static/images/bingo/ganarBingo.png`,
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

document.addEventListener("DOMContentLoaded", () => {
    let msg = document.querySelector("#user-message");
    msg.addEventListener("keyup", event => {
        event.preventDefault();
        if(event.keyCode === 13){
            document.querySelector("#send-message").click();
        }
    })
})