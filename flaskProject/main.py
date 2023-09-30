from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

#@app.route('/')
#def init():
#    return render_template('carga.html')

@app.route('/')
def inicio():
    return render_template('inicio.html')

@app.route('/Juegos/')
def index():
    return render_template('pantallaJuegos.html')  # reconoce automaticamente la carpeta templates y de ahi eliges el html

@app.route('/Registro/')
def registro():
    return render_template('registro.html')

@app.route('/Carta_mas_alta/')
def juego_cartas():
    return open('cartaMasAlta/carta_mas_alta.html')

@app.errorhandler(404)
def page_not_found(error):
 return render_template("pagina_no_encontrada.html"), 404

if __name__ == '__main__':
    app.run(debug=True) # puedo modificar el puerto por defecto
