from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

#@app.route('/')
#def init():
#    return render_template('carga.html')

@app.route('/',methods=['GET','POST'])
def inicio():
    if request.method == 'GET': # GET
            return render_template('inicio.html')
    else: # POST datosTarjeta
            print("Tarjeta")
            numero4 = request.form['numero4']
            numero8 = request.form['numero8']
            numero12 = request.form['numero12']
            numero16 = request.form['numero16']
            dia = request.form['dia']
            mes = request.form['mes']
            cvv = request.form['cvv']
            print("Nº Tarjeta:", numero4,numero8,numero12,numero16)
            print("Caducidad:", dia,"/",mes)
            print("CVV:", cvv)
            return render_template('inicio.html')

@app.route('/Juegos/',methods=['POST'])
def index():
    if request.method == 'POST':
        nombreUsuario = request.form['nombreUsuario']
        contraseña = request.form['contraseña']
        print("Nombre de usuario:", nombreUsuario)
        print("Contraseña:", contraseña)
        return render_template('pantallaJuegos.html')

@app.route('/Registro/')
def registro():
    return render_template('registro.html')
@app.route('/Usuario/',methods=['POST'])
def tarjeta():
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        telefono = request.form['telefono']
        DNI = request.form['DNI']
        correo = request.form['correo']
        nombreUsuario = request.form['nombreUsuario']
        contraseña = request.form['contraseña']
        print("Nombre:", nombre)
        print("Apellido:", apellido)
        print("Telefono:", telefono)
        print("DNI:", DNI)
        print("Correo:", correo)
        print("Nombre de usuario:", nombreUsuario)
        print("Contraseña:", contraseña)
        return render_template('tarjeta.html')

@app.route('/Carta_mas_alta/')
def juego_cartas():
    return open('cartaMasAlta/carta_mas_alta.html')

@app.errorhandler(404)
def page_not_found(error):
 return render_template("pagina_no_encontrada.html"), 404

if __name__ == '__main__':
    app.run(debug=True) # puedo modificar el puerto por defecto
