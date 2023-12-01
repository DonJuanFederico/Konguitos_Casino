//Esto es como la vista del cliente

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


    var socket = io();
    let room = "Lounge";
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
        }
    });

    document.querySelector("#send-message").onclick = () => {
        socket.send({"msg" : document.querySelector("#user-message").value, "username": username, "room": room});
        document.querySelector("#user-message").value = "";
    }

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
})

primeroFila = true;
primeroDobleFila = true;
primeroBingo = true;
fila1 = 0;
fila2= 0;
fila3=0;

let numeros = Array.from({ length: 90 }, (_, index) => index + 1);

/*Esta funcion solo el anfitrion*/
function mostrarNumerosRapidos() {
    const spanNumero = document.getElementById("numeroSeleccionado");
    const tiempoVisualizacion = 4; // Tiempo de visualización de números en segundos
    const tiempoEspera = 3; // Tiempo de espera entre visualizaciones en segundos

    const intervalo = setInterval(() => {
        const numeroAleatorio = Math.floor(Math.random() * 90) + 1; // Genera un número aleatorio entre 1 y 90
        spanNumero.textContent = numeroAleatorio; // Actualiza el número en el span
    }, 100); // Intervalo de actualización rápida

    setTimeout(() => {
        clearInterval(intervalo); // Detiene la actualización después de 5 segundos
        spanNumero.textContent = Math.floor(Math.random() * 90) + 1;

        const spans = document.querySelectorAll('#carton > div > span');

        let iteracion=0;

        const numeroSeleccionado = obtenerNumeroAleatorio();
        spanNumero.textContent = numeroSeleccionado;
        spans.forEach((span) => {
            const valor = parseInt(span.textContent.trim(), 10); // Obtener el valor del span y convertirlo a entero
            if (valor === numeroSeleccionado) {
                span.parentElement.style.backgroundColor = "red"; // Cambiar el fondo del span a rojo si coincide con el número generado
                if(iteracion<9){
                    fila1++;
                }else if (iteracion>= 9 && iteracion <18){
                    fila2++;
                }else{
                    fila3++;
                }
                if((fila1 === 5 || fila2 === 5 || fila3 === 5) && primeroFila){
                    console.log("Hizo fila");
                    primeroFila = false;
                }
                if((((fila1 + fila2) === 10) || ((fila1 + fila3) === 10) || ((fila2 + fila3) === 10)) && primeroDobleFila){
                    console.log("Hizo doble fila");
                    primeroDobleFila = false;
                }
                if((fila1 + fila2 + fila3 === 15) && primeroBingo){
                    console.log("Bingo");
                    primeroBingo = false;
                }
            }
            iteracion++;
        });

        setTimeout(mostrarNumerosRapidos, tiempoEspera * 1000); // Llama a la función nuevamente después de 3 segundos de espera
    }, (tiempoVisualizacion + tiempoEspera) * 1000); // Espera el tiempo total antes de reiniciar (tiempo de visualización + tiempo de espera)
}

mostrarNumerosRapidos(); // Iniciar la función al principio

document.addEventListener("DOMContentLoaded", () => {
    let msg = document.querySelector("#user-message");
    msg.addEventListener("keyup", event => {
        event.preventDefault();
        if(event.keyCode === 13){
            document.querySelector("#send-message").click();
        }
    })
})

 function obtenerNumeroAleatorio() {
    if (numeros.length === 0) {
        console.log("Todos los números ya han sido seleccionados.");
        return null; // O manejar de otra forma que no hay más números disponibles
    }

    const indiceAleatorio = Math.floor(Math.random() * numeros.length);
    const numeroSeleccionado = numeros.splice(indiceAleatorio, 1)[0];
    console.log("Número seleccionado:", numeroSeleccionado);
    return numeroSeleccionado;
}