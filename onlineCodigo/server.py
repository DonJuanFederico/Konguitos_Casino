from flask import Flask, render_template, request, jsonify
from waitress import serve
from bbdd import *

app = Flask(__name__)

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
    '''Desencriptar datos'''
    nombre = request.form.get('nombre')
    almacenar_nombre(nombre)
    id = request.form.get('id')
    guardarPartida(nombre, id)
    return jsonify({'message': 'Datos guardados correctamente'})

@app.route('/unirse', methods=['POST'])
def unirse():
    id = request.form.get('id')
    nombre = buscarAnfitrion(id)
    print("Mi nombre ahora es " + nombre)
    almacenar_nombre(nombre)
    return jsonify({'message': 'Datos guardados correctamente'})

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port = 8000)
