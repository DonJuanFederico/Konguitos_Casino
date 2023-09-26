from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')  # indica la ventana (url/link) donde se va a reproducir la funcion, el '/' es la ruta base
                 # si pongo varias rutas para un mismo metodo se puede acceder a este por todas ellas
def init():  # usuario y contraseña
    return open('pagina_inicio.html')

@app.route('/login/')
def index():
    return open('indice.html')
# -----------------------------------------------------
""""
@app.route('/juegos_de_cartas/')
def index():
    return open('cartas.html')

@app.route('/juegos_de_dados/')
def index():
    return open('dados.html')

@app.route('/ruleta/')
def index():
    return open('ruleta.html')

@app.route('/events/')
def index():
    return open('event.html')

@app.route('/juegos_extra/')
def index():
    return open('extra.html')
"""

# EJEMPLOOOOOO

# tipos de variables: int, float, string, path, uuid
@app.route('/hello/')
@app.route('/hello/<name>')
@app.route('/hello/<string:name>/<int:edad>') # si pongo solo hello no va pero si recibe el otro parametro (variable) si
                                              # donde pone sting puedo poner cualquier tipo de variable
def hello(name = None, edad = None):
    if name == None and edad == None:
        return 'Hola mundo'
    elif edad == None:
        #return f'<h1>Hola, {name}!</h1>'
        return f'<a href="https://www.casino777.es/">CARTAS</a>, {name}!</h1>'

    else:
        return f'<h1>Hola, {name} y tu edad es la mitad de {edad * 2}!</h1>'

from markupsafe import escape
@app.route('/code/<path:code>')
def code(code):
    return f'<code>{escape(code)}</code>' # para q se muestre como un texto
    # return f'<code>{code}</code>          de esta manera te salta la alerta (foto)