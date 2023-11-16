from flask import Flask, render_template, request
from waitress import serve
from bbdd import *

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    NUMERO = obtenerNumero()
    return render_template("index.html", NUMERO = NUMERO)

@app.route('/sumar_valor', methods=['POST'])
def sumar_valor():
    sumarValor()
    return 'Incremento exitoso'  # Puedes ajustar el mensaje según tus necesidades

@app.route('/resetear_valor', methods=['POST'])
def resetear_valor():
    resetearValor()

@app.route('/obtener_valor_actualizado', methods=['GET'])
def obtener_valor_actualizado():
    valor = obtenerNumero()
    return {'valor_actualizado': valor}

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port = 8000)
