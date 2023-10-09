from flask import Flask, render_template, request, jsonify, Response, redirect, url_for
from BBDD.conexionBBDD import *
from datetime import datetime
from templates.form import *

app = Flask(__name__)
#python
#import os
#random_bytes = os.urandom(12)
#hex_representation = random_bytes.hex()
#print(hex_representation)
app.config['SECRET_KEY'] = 'ded843028a32eb605772926d'


@app.route('/')
def index():
    return redirect(url_for('inicio'))


@app.route('/Inicio/', methods=['GET', 'POST'])
def inicio():
    form = inicioSesion()
    if form.validate_on_submit():
        nombreUsuario = form.username.data
        contraseña = form.password.data
        print("Nombre de usuario:", nombreUsuario)
        print("Contraseña:", contraseña)
        if iniciar_sesion(nombreUsuario, contraseña):
            return juegos()
        else:
            print("Inicio de sesión fallido: usuario o contraseña incorrectos, o BBDD apagada")
            return index()
    return render_template('inicio.html', form=form)


@app.route('/Registro/', methods=['GET', 'POST'])
def registroUsuario():
    form = crearUsuario()
    if form.validate_on_submit():
        nombreUsuario = form.username.data
        contraseña = form.password.data
        correo = form.email.data
        DNI = form.dni.data
        dinero = 0.0
        telefono = form.telephone.data
        foto = None
        fecha_hora = datetime.now()
        calle = form.street.data
        codigoPostal = form.postalCode.data
        numeroTarjeta = form.cardNumber.data
        titulanteTarjeta = form.nameHolder.data
        caducidadTarjeta = form.expirationDate.data
        cvv = form.cvv.data
        print("Nombre de usuario:", nombreUsuario)
        print("NumeroTarjeta:", numeroTarjeta)
        if agregarUsuario(nombreUsuario, contraseña, correo, DNI, dinero, telefono, foto, calle, codigoPostal):
            print("Exito Usuario")
            if agregarTarjeta(nombreUsuario,numeroTarjeta, titulanteTarjeta, caducidadTarjeta, cvv):
                print("Exito Tarjeta")
                return camara()
            else:
                return redirect(url_for('registroUsuario'))
        else:
            return redirect(url_for('registroUsuario'))
    return render_template('registroUsuario.html', form=form)

@app.route('/Registro/terminosCondiciones.html')
def terminos():
    return render_template('terminosCondiciones.html')

@app.route('/Camara/')
def camara():
    return render_template('camara.html')

@app.route('/Registro Administrador/')
def registroAdmin():
    return render_template('registroAdmin.html')
@app.route('/Juegos/')
def juegos():
        return render_template('pantallaJuegos.html')

@app.route('/Datos Usuario/')
def datosUsuario():
    return render_template('cambiosUsuarioAdmin.html')

@app.route('/Administrador/', methods=['GET','POST'])
def interfazAdmin():
    if request.method == 'POST':
        print("ADMIN:")
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        idEmpresa = request.form['idEmpresa']
        correoEmpresa = request.form['correoEmpresa']
        contraseña = request.form['contraseña']
        print("Nombre:", nombre)
        print("Apellido:", apellido)
        print("ID Empresa:", idEmpresa)
        print("Correo Empresa:", correoEmpresa)
        print("Contraseña:", contraseña)
        return render_template('admin.html')
    else:
        return render_template('admin.html')

# indice de juegos


# direcciones de las categorias de juegos
#idice de juegos de cartas
@app.route('/Juegos/Indice_cartas/', methods=['GET'])
def cartas():
    return render_template('cards_index.html')
@app.route('/Juegos/Indice_cartas/Carta_mas_alta/', methods=['GET'])
def carta_mas_alta():
    return render_template('carta_mas_alta.html')
@app.route('/Juegos/Indice_cartas/Carta_mas_alta/A_Jugar/', methods=['GET'])
def A_Jugar():
    return render_template('cartas_antiguo.html')
@app.route('/Juegos/Indice_cartas/Blackjack/', methods=['GET'])
def blackjack():
    return render_template('blackjack.html')

#indice de juegos de dados
@app.route('/Juegos/Indice_Dados/', methods=['GET'])
def dados():
    return render_template('dice_index.html')
@app.route('/Juegos/Indice_Dados/Craps/', methods=['GET'])
def craps():
    return render_template("craps.html")

@app.route('/Juegos/Ruleta/', methods=['GET'])
def ruleta():
    return render_template('ruleta.html')

@app.route('/Juegos/Tragaperras/')
def tragaperras():
    return render_template('Tragaperras.html')

@app.route('/Juegos/DinoKongo/', methods=['GET'])
def dino():
    return open('games/dinosaurio/index.html')

@app.route('/Juegos/Eventos/', methods=['GET'])
def event():
    return render_template('eventos.html')

@app.route('/Juegos/Juegos_extra/', methods=['GET'])
def juegos_extra():
    return render_template('juegos_extra.html')

@app.route('/Juegos/Juegos_extra/Dinosaurio', methods=['GET'])
def cargarDino():
    return render_template('dinosaurio.html')

# dineros
@app.route('/dinero/', methods=['GET'])
def dinero():
    DINERO = obtenerDinero()
    return render_template('dinero.html', DINERO = DINERO)

@app.route('/agregar_dinero', methods=['POST'])
def agregar_dinero():
    cantidad_a_agregar = float(request.form.get('cantidad_a_agregar'))
    agregarDinero(cantidad_a_agregar)
    return "Dinero agregado correctamente"

@app.route('/retirar_dinero', methods=['POST'])
def retirar_dinero():
    cantidad_a_retirar = float(request.form.get('cantidad_a_retirar'))
    retirarDinero(cantidad_a_retirar)
    return "Dinero retirado correctamente"

@app.route('/Juegos/Juegos_extra/KonguitoRun.html')
def konguito():
    DINERO = obtenerDinero()
    return render_template('konguitoRun.html', DINERO = DINERO)

@app.errorhandler(404)
def page_not_found(error):
    return render_template("pagina_no_encontrada.html"), 404

if __name__ == '__main__':
    app.run(debug=True)
