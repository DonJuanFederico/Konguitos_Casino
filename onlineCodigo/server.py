from time import localtime, strftime
from flask import Flask, render_template, request, jsonify, redirect, url_for
from waitress import serve
from bbdd import *
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from Jugador import Jugador

app = Flask(__name__)

#Inicializar flask socketio
socketio = SocketIO(app)
ROOMS = ["lounge", "Sala 1", "Sala 2", "Sala 3"]
numero_conexiones = 0

#Setter
def almacenar_nombre(nombre):
    global usuario
    usuario = nombre
#Getter
def return_nombre():
    return usuario

@app.route('/')
@app.route('/inicio')
def inicio():
    return render_template("inicio.html")

@app.route('/index')
def index():
    return render_template("index.html", NUMERO = 0,)

@app.route('/sumar_valor', methods=['POST'])
def sumar_valor():
    sumarValor(return_nombre())
    return 'Incremento exitoso'

@app.route('/resetear_valor', methods=['POST'])
def resetear_valor():
    resetearValor(return_nombre())
    return 'Valor reseteado correctamente'

@app.route('/obtener_valor_actualizado', methods=['GET'])
def obtener_valor_actualizado():
    try:
        valor = obtenerNumero(return_nombre())
        print("Valor " + str(valor))
        return {'valor_actualizado': valor}
    except NameError as e:
        return jsonify({'error': 'Variable usuario no está definida'}), 500

@app.route('/guardar_datos', methods=['POST'])
def guardar_datos():
    nombre = request.form.get('nombre')
    almacenar_nombre(nombre)
    id = request.form.get('id')
    global id_jugador
    id_jugador = Jugador(id)
    guardarPartida(nombre, id)
    # Aquí se genera la redirección a la vista chat con el parámetro id
    return redirect(url_for('chat'))


@app.route('/chat', methods=['GET', 'POST'])
def chat():
    return render_template('chat.html', username=obtenerNombre(id_jugador.get_id()), rooms = ROOMS)

'''@app.route('/unirse', methods=['POST'])
def unirse():
    id = request.form.get('id')
    nombre = buscarAnfitrion(id)
    print("Mi nombre ahora es " + nombre)
    almacenar_nombre(nombre)
    return jsonify({'message': 'Datos guardados correctamente'})'''

@socketio.on("message")
def message(data):
    send({"msg": data["msg"], "username": data["username"], "time_stamp": strftime("%b-%d %I:%M%p", localtime())}, room = data["room"])
    print(f"{data}")
    #Evento personalizado:
    #emit("some-event", "this is a custom event message")

@socketio.on("join")
def join(data):
    #Antes del send especificar la sala
    join_room(data["room"])
    send({"msg": data["username"] + " se ha unido a la sala " + data["room"]}, room = data["room"])

@socketio.on("leave")
def leave(data):
    leave_room(data["room"])
    send({"msg": data["username"] + " se ha salido de la sala " + data["room"]}, room = data["room"])

@socketio.on("anadir")
def anadir(data):
    #Antes del send especificar la sala
    join_room(data["room"])
    emit("nuevo_valor_contador", {"valor": int(data["valor"])}, room=data["room"])  # Retransmitir a todos los clientes

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port = 8000)
    socketio.run(app, debug = True)

