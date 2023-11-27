//Esto es como la vista del cliente

document.addEventListener("DOMContentLoaded", () =>{
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
            p.innerHTML = span_username.outerHTML + br.outerHTML + data.msg + br.outerHTML + span_timestamp.outerHTML;
            document.querySelector("#display-message-section").append(p);
        } else{
            printSysMsg(data.msg);
        }
    });

    socket.on("nuevo_valor_contador", data => {
        document.getElementById("contador").innerText = data.valor;
    });

    document.querySelector("#probando").onclick = () => {
        sumar();
        socket.emit("anadir", {"username" : username, "room": room, "valor": document.getElementById("contador").innerText});
    }

    document.querySelector("#send-message").onclick = () => {
        socket.send({"msg" : document.querySelector("#user-message").value, "username": username, "room": room});
         document.querySelector("#user-message").value = "";
    }

    document.querySelectorAll(".select-room").forEach(p => {
        p.onclick = () =>{
            let newRoom = p.innerHTML;
            if(newRoom === room){
                msg = `Esta ya en la sala ${room}`
                printSysMsg(msg);
            } else {
                leaveRoom(room);
                 document.getElementById("contador").innerText = 0;
                joinRoom(newRoom);
                room = newRoom;
            }
        }
    });

    function leaveRoom(room){
        //Emit ya que es personalizado, y pasando los dos valores que necesita
        socket.emit("leave", {"username" : username, "room": room});
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

    function sumar() {
        document.getElementById("contador").innerText = parseInt(document.getElementById("contador").innerText) + 1;
    }
})