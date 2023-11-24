from flask import Flask, render_template, request, jsonify, Response, redirect, url_for, session
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
        if adminLogIn(nombreUsuario, contraseña):
            return interfazAdmin()
        elif iniciar_sesion(nombreUsuario, contraseña):
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
        session['nombreUsuario'] = nombreUsuario
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
        if agregarUsuario(nombreUsuario, contraseña, correo, DNI, dinero, telefono, foto, calle, codigoPostal, None):
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

@app.route('/Perfil_de_usuario/Avatar/')
def avatar():
    return render_template('avatares.html')

@app.route('/Camara/',methods=['GET','POST'])
def camara():
    form = TomarFoto()
    if form.validate_on_submit():
        foto = tomarFoto()
        print("a:",foto.__sizeof__())
        nombreUsuario = session.get('nombreUsuario')
        print("a: ", nombreUsuario)
        if agregarFotoUsuario(nombreUsuario,foto):
            print("c")
            return redirect(url_for('camara'))
        return redirect(url_for('camara'))
    return render_template('camara.html',form=form)

@app.route('/Registro Administrador/', methods=['GET', 'POST'])
def registroAdmin():
    form = crearAdmin()
    if form.validate_on_submit():
        nombre = form.name.data
        contraseña = form.password.data
        correo = form.email.data
        print("Nombre Completo:", nombre)
        print("Contraseña:", contraseña)
        print("Correo:", correo)
        if crear_administrador(nombre, contraseña, correo):
            print("Éxito")
            return redirect(url_for('index'))
    else:
        return render_template('registroAdmin.html', form=form)
    return render_template('registroAdmin.html', form=form)

#Funciones Administrador
@app.route('/Administrador/')
def interfazAdmin():
    return render_template('funcionesAdmin/descripcion.html')


@app.route('/Administrador/Usuarios/')
def tablaUsuarios():
    usuarios = obtenerUsuariosConTarjetas()
    print(usuarios)
    return render_template('funcionesAdmin/usuarios.html', usuarios=usuarios)


@app.route('/Administrador/Tarjetas/')
def tablaTarjetas():
    usuarios = obtenerUsuariosConTarjetas()
    return render_template('funcionesAdmin/tarjetas.html', usuarios=usuarios)


@app.route('/EditarUsuario/<string:id>/', methods=['GET', 'POST'])
def editarUsuario_funcionesAdmin(id):
    data = obtenerArrayDatosUsuario(id)
    print(data)
    username = request.form.get('username')
    email = request.form.get('email')
    dni = request.form.get('dni')
    money = request.form.get('money')
    phone = request.form.get('phone')
    street = request.form.get('street')
    postal_code = request.form.get('postal_code')
    if request.method == 'POST':
        if editarUsuario(id, username, email, dni, money, phone, street, postal_code):
            return redirect(url_for('tablaUsuarios'))
        else:
            return redirect(url_for('editarUsuario_funcionesAdmin'))
    return render_template("funcionesAdmin/editarUsuario.html", data=data)


@app.route('/EditarTarjeta/<string:id>/', methods=['GET', 'POST'])
def editarTarjetas_funcionesAdmin(id):
    data2 = obtenerArrayDatosTarjeta(id)
    print(data2)
    if request.method == 'POST':
        card_number = request.form.get('card_number')
        card_holder = request.form.get('card_holder')
        expiration_date = request.form.get('expiration_date')
        cvv = request.form.get('cvv')
        if editarTarjeta(id, card_number, card_holder, expiration_date, cvv):
            return redirect(url_for('tablaTarjetas'))
    return render_template("funcionesAdmin/editarTarjeta.html", data2=data2)


@app.route('/Administrador/Edición/', methods=['GET', 'POST'])
def edicion():
    if request.method == 'POST':
        nombreUsuario = request.form.get('username')
        contraseña = request.form.get('password')
        correo = request.form.get('email')
        DNI = request.form.get('dni')
        dinero = request.form.get('money')
        telefono = request.form.get('phone')
        foto = None
        calle = request.form.get('street')
        codigoPostal = request.form.get('postal_code')

        numeroTarjeta = request.form.get('card_number')
        titulanteTarjeta = request.form.get('card_holder')
        caducidadTarjeta = request.form.get('expiration_date')
        cvv = request.form.get('cvv')
        print(nombreUsuario, contraseña, correo, DNI, dinero, telefono, foto, calle, codigoPostal)
        print(numeroTarjeta, titulanteTarjeta, caducidadTarjeta, cvv)
        if agregarUsuario(nombreUsuario, contraseña, correo, DNI, dinero, telefono, foto, calle, codigoPostal, None):
            print("Exito Usuario")
            if agregarTarjeta(nombreUsuario, numeroTarjeta, titulanteTarjeta, caducidadTarjeta, cvv):
                print("Exito Tarjeta")
                return redirect(url_for('tablaTarjetas'))
            else:
                return redirect(url_for('tablaUsuarios'))
        else:
            return redirect(url_for('interfazAdmin'))
    return render_template('funcionesAdmin/edicion.html')



@app.route('/Juegos/')
def juegos():
        return render_template('pantallaJuegos.html', NOMBRE = obtener_nombre())

@app.route('/Perfil_de_usuario/', methods=['GET'])
def perfil():
    return render_template('perfil.html')

@app.route('/soporte_cliente/')
def ayuda():
    return render_template('soporte_cliente.html')

# direcciones de las categorias de juegos
#idice de juegos de cartas
@app.route('/Juegos/Indice_cartas/', methods=['GET'])
def cartas():
    return render_template('juegosCartas.html')
@app.route('/Juegos/Indice_cartas/Carta_mas_alta/', methods=['GET'])
def A_Jugar():
    DINERO = obtenerDinero()
    return render_template('cartas_antiguo.html', DINERO = DINERO)

#indice de juegos de dados
@app.route('/Juegos/Indice_Dados/', methods=['GET'])
def dados():
    return render_template('dice_index.html')


@app.route('/Juegos/Ruleta/')
def ruleta():
    DINERO = obtenerDinero()
    return render_template('ruleta.html', DINERO = DINERO)

@app.route('/Juegos/DinoKongo/', methods=['GET'])
def dino():
    return open('games/dinosaurio/index.html')

@app.route('/Juegos/Eventos/', methods=['GET'])
def event():
    return render_template('eventos.html')

@app.route('/Juegos/Eventos/RuletaRusa', methods=['GET'])
def ruletaRusa():
    DINERO = obtenerDinero()
    return render_template('ruleta_rusa.html', DINERO = DINERO)

@app.route('/Juegos/Juegos_extra/', methods=['GET'])
def juegos_extra():
    return render_template('juegosExtra.html')

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

@app.route('/Juegos/Juegos_extra/Bingo')
def bingo():
    DINERO = obtenerDinero()
    return render_template('bingo.html', DINERO = DINERO)

@app.route('/Juegos/Juegos_extra/Slots')
def slots():
    DINERO = obtenerDinero()
    return render_template('Tragaperras.html', DINERO = DINERO)

@app.route('/Juegos/Indice_cartas/Blackjack/', methods=['GET'])
def blackjack():
    DINERO = obtenerDinero()
    return render_template('blackjack.html', DINERO = DINERO)

@app.route('/Juegos/Indice_Dados/Craps/', methods=['GET'])
def craps():
    DINERO = obtenerDinero()
    return render_template("craps.html", DINERO = DINERO)

@app.route('/Juegos/Juegos_extra/KonguitoRun')
def konguito():
    DINERO = obtenerDinero()
    return render_template('konguitoRun.html', DINERO = DINERO)

@app.route('/Juegos/Juegos_extra/Plinko')
def plinko():
    DINERO = obtenerDinero()
    return render_template('plinko_robado.html', DINERO = DINERO) # ESTA EL ROBAOD NO EL NUESTRO


@app.errorhandler(404)
def page_not_found(error):
    return render_template("pagina_no_encontrada.html"), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
