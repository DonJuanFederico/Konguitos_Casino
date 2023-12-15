import webbrowser
from flask import Flask, render_template, request, jsonify, Response, redirect, url_for, session, flash
from BBDD.conexionBBDD import *
from datetime import datetime
from templates.form import *
from correo.correo import *
from waitress import serve
from flask_socketio import SocketIO, send, emit, join_room, leave_room
import re
from CartonBingo.CreadorCarton import CreadorCarton
from time import strftime, localtime
import time
from PIL import Image
import io
from flask_session import Session
import random

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# Inicializar flask socketio
socketio = SocketIO(app)
ROOMS = []
ROOMSPokerDados = []

# python
# import os
# random_bytes = os.urandom(12)
# hex_representation = random_bytes.hex()
# print(hex_representation)
app.config['SECRET_KEY'] = 'ded843028a32eb605772926d'

app.config['registroAdmin'] = False # Para la alerta de registro administrador correcto
app.config['nombreUsuarioRegistrado'] = False; # Para la alerta de registro usuario correcto

@app.route('/')
def index():
    return redirect(url_for('inicio'))

@app.route('/Inicio/', methods=['GET', 'POST'])
def inicio():
    nombreUsuarioInicio = ""
    contrasenna = ""
    mensaje = ""
    print(app.config['nombreUsuarioRegistrado'])
    if session.get('registroAdmin') is True:
        flash("Usuario administrador se acaba de registrar", "info")
        session['registroAdmin'] = False
    if session.get('nombreUsuarioRegistrado') is True:
        flash("Usuario se acaba de registrar", "info")
        session['nombreUsuarioRegistrado'] = False
    if request.method == 'POST':
        nombreUsuarioInicio = request.form.get('nombreUsuarioInicio')
        session['nombreUsuarioInicio'] = nombreUsuarioInicio # La hago global
        contrasennaInicio = request.form.get('contraseña')
        if adminLogIn(nombreUsuarioInicio, contrasennaInicio):
            flash("Registrado como administrador", "info")
            return interfazAdmin()
        elif iniciar_sesion_correo(nombreUsuarioInicio, contrasennaInicio):
            return juegos()
        elif iniciar_sesion(nombreUsuarioInicio, contrasennaInicio):
            return juegos()
        else:
            flash("Usuario,Correo o contraseña incorrecto", "info")
            return index()
    return render_template('inicio.html',mensaje=mensaje, nombreUsuarioInicio=nombreUsuarioInicio, contrasenna=contrasenna)


@app.route('/Registro/Datos Personales/', methods=['GET','POST'])
def registroUsuario():
    mensaje = ""
    nombreUsuario = ""
    correo = ""
    DNI = ""
    telefono = ""
    pais = ""
    codigoPostal = ""
    contraseña = ""
    verificarContraseña = ""
    aceptaTerminos = ""
    if request.method == 'POST':
        nombreUsuario = request.form.get('nombreUsuario')
        correo = request.form.get('correo')
        DNI = request.form.get('DNI')
        telefono = request.form.get('telefono')
        pais = request.form.get('pais')
        codigoPostal = request.form.get('codigoPostal')
        contraseña = request.form.get('contraseña')
        verificarContraseña = request.form.get('verificarContraseña')
        aceptaTerminos = request.form.get('terminosYCondiciones')
        session['nombreUsuario'] = nombreUsuario
        session['correo'] = correo
        session['DNI'] = DNI
        session['telefono'] = telefono
        session['pais'] = pais
        session['codigoPostal'] = codigoPostal
        session['contraseña'] = contraseña
        if (nombreUsuario == "" or correo == "" or DNI == "" or telefono == "" or pais == "" or codigoPostal == "" or contraseña == "" or verificarContraseña == ""):
            flash("Rellene todos los campos", "info")
        else:
            if obtenerId(nombreUsuario) is not None:
                flash("El usuario " + nombreUsuario + " ya existe", "info")
            else:
                    if existeCorreo(correo):
                        flash("Correo " + correo + " ya registrado", "info")
                    else:
                        if existeDNI(DNI):
                            flash("DNI " + DNI + " ya registrado", "info")
                        else:
                            if existeTelefono(telefono):
                                flash("Teléfono " + telefono + " ya registrado", "info")
                            else:
                                flash("")
                                # Verificar la presencia de letras mayúsculas, minúsculas, dígitos y caracteres especiales
                                tiene_mayuscula = any(c.isupper() for c in contraseña)
                                tiene_minuscula = any(c.islower() for c in contraseña)
                                tiene_digito = any(c.isdigit() for c in contraseña)
                                tiene_caracter_especial = any(c for c in contraseña if c.isalnum() is False)
                                if tiene_mayuscula and tiene_minuscula and tiene_digito and tiene_caracter_especial and (len(contraseña) >= 8):
                                    flash("")
                                    if contraseña == verificarContraseña:
                                        if aceptaTerminos == "on":
                                            flash("")
                                            return redirect(url_for('registroTarjeta'))
                                        else:
                                            flash("")
                                            flash("Debe aceptar los términos y condiciones para poder continuar con el registro", "info")
                                    else:
                                        flash("Las contraseñas no coinciden", "info")
                                else:
                                    flash("Contraseña poco segura, se aconseja introducir al menos una mayúscula, minúscula, un número, un carácter especial y mínimo 8 caracteres", "info")
    return render_template('registroUsuario.html', mensaje=mensaje, nombreUsuario=nombreUsuario, correo=correo, DNI=DNI, telefono=telefono, pais=pais, codigoPostal=codigoPostal, contraseña=contraseña, verificarContraseña=verificarContraseña)

@app.route('/Registro/Tarjeta Bancaria/', methods=['GET', 'POST'])
def registroTarjeta():
    numeroTarjeta = ""
    titulanteTarjeta = ""
    caducidadTarjeta = ""
    cvv = ""
    if request.method == 'POST':
        numeroTarjeta = request.form.get('numeroTarjeta')
        titulanteTarjeta = request.form.get('titulanteTarjeta')
        caducidadTarjeta = request.form.get('caducidadTarjeta')
        cvv = request.form.get('CVV')

        # Número de Tarjeta
        tarjeta = numeroTarjeta.split(" ")
        if len(tarjeta) == 3:
            numeroTarjeta = tarjeta[0] + tarjeta[1] + tarjeta[2]
        elif len(tarjeta) == 4:
            numeroTarjeta = tarjeta[0] + tarjeta[1] + tarjeta[2] + tarjeta[3]
        tarjeta = caducidadTarjeta.split("/")
        caducidadTarjeta = "20" + tarjeta[1] + "-" + tarjeta[0] + "-01"
        session['numeroTarjeta'] = numeroTarjeta
        session['titulanteTarjeta'] = titulanteTarjeta
        session['caducidadTarjeta'] = caducidadTarjeta
        session['cvv'] = cvv
        print("NumeroTarjeta: " + session.get('numeroTarjeta'))
        print("FechaCaducidad: " + session.get('caducidadTarjeta'))
        return redirect(url_for('foto_y_registra_usuario'))
    return render_template('registroTarjeta.html', numeroTarjeta=numeroTarjeta, titulanteTarjeta=titulanteTarjeta, caducidadTarjeta=caducidadTarjeta, cvv=cvv)


def convertir_imagen_a_blob(file_storage):
    imagen_blob = file_storage.read()
    return imagen_blob

@app.route('/Registro/Foto Personal/', methods=['GET', 'POST'])
def foto_y_registra_usuario():
    nombreUsuario = session.get('nombreUsuario')
    if request.method == 'POST':
        photo = request.files.get('photo')
        if agregarUsuario(nombreUsuario, session.get('contraseña'), session.get('correo'), session.get('DNI'), 1000, session.get('telefono'), convertir_imagen_a_blob(photo), session.get('pais'), session.get('codigoPostal'), None):
            print("Exito Usuario")
            if agregarTarjeta(nombreUsuario, session.get('numeroTarjeta'), session.get('titulanteTarjeta'), session.get('caducidadTarjeta'), session.get('cvv')):
                print("Exito Tarjeta")
                session['nombreUsuarioRegistrado'] = True
                return redirect(url_for('index'))
            else:
                return redirect(url_for('index'))
        return redirect(url_for('index'))
    return render_template('registroCamara.html', nombreUsuario = nombreUsuario)

@app.route('/Registro/terminosCondiciones.html')
def terminos():
    return render_template('terminosCondiciones.html')


@app.route('/Perfil_de_usuario/Avatar/')
def avatar():
    usuario = session.get('nombreUsuarioInicio')
    id_usuario = obtenerId(usuario)
    VALORES = obtenerValoresGashapon(id_usuario)
    # Accede directamente al valor asociado a la clave 'pirata'
    pirata = VALORES.get('pirata', 0)  # Si 'pirata' no está en VALORES, devuelve 0
    astronauta = VALORES.get('astronauta', 0)
    rey = VALORES.get('rey', 0)
    capitan = VALORES.get('capitan', 0)
    tigre = VALORES.get('tigre', 0)
    vikingo = VALORES.get('vikingo', 0)
    # Pasa las variables a la plantilla
    return render_template('avatares.html', PIRATA=pirata, ASTRONAUTA=astronauta, REY=rey,
                           CAPITAN=capitan, TIGRE=tigre, VIKINGO=vikingo, ID=id_usuario)


@app.route('/Registro Administrador/', methods=['GET', 'POST'])
def registroAdmin():
    nombreUsuarioAdmin = ""
    contrasennaAdmin = ""
    correoAdmin = ""
    mensaje = ""
    if request.method == 'POST':
        nombreUsuarioAdmin = request.form.get('nombreAdministrador')
        session['nombreAdministrador'] = nombreUsuarioAdmin
        contrasennaAdmin = request.form.get('contrasenna')
        correoAdmin = request.form.get('correoAdmin')
        if (nombreUsuarioAdmin == "" or contrasennaAdmin == "" or correoAdmin == ""):
            flash("Rellene todos los campos", "info")
        else:
            if existeUsuario(nombreUsuarioAdmin):
                flash("El usuario " + nombreUsuarioAdmin + " ya existe como usuario", "info")
            else:
                if existeAdmin(nombreUsuarioAdmin):
                    flash("El usuario " + nombreUsuarioAdmin + " ya existe como administrador", "info")
                else:
                    if existeCorreo(correoAdmin):
                        flash("Correo " + correoAdmin + " ya registrado como usuario", "info")
                    else:
                        if existeCorreoAdmin(correoAdmin):
                            flash("Correo " + correoAdmin + " ya registrado en administrador", "info")
                        else:
                            session['registroAdmin'] = True
                            crear_administrador(nombreUsuarioAdmin, contrasennaAdmin, correoAdmin)
                            return redirect(url_for('index'))
    else:
        return render_template('registroAdmin.html', mensaje=mensaje, nombreUsuarioAdmin=nombreUsuarioAdmin, contrasennaAdmin=contrasennaAdmin, correoAdmin=correoAdmin)
    return render_template('registroAdmin.html', mensaje=mensaje, nombreUsuarioAdmin=nombreUsuarioAdmin, contrasennaAdmin=contrasennaAdmin, correoAdmin=correoAdmin)


# Funciones Administrador
@app.route('/Administrador/')
def interfazAdmin():
    phpmyadmin_url = "http://localhost/phpmyadmin/"
    try:
        webbrowser.open(phpmyadmin_url)
        return index()
    except Exception as e:
        print("Error al abrir phpMyAdmin: {str(e)}")
        return f"Error al abrir phpMyAdmin: {str(e)}"

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
    nombre = session.get('nombreUsuarioInicio')
    print("nombre: ", nombre)
    return render_template('pantallaJuegos.html', NOMBRE=nombre)


@app.route('/Rankings/')
def rankings():
    datos_ranking = obtenerRankingDineroGanado()
    print(datos_ranking)
    return render_template('rankings.html', datos_ranking=datos_ranking)


@app.route('/Perfil_de_usuario/', methods=['GET', 'POST'])
def perfil():
    print("ENTRA")
    usuario = session.get('nombreUsuarioInicio')
    usuario_id = obtenerId(usuario)
    print("usuario: ", usuario)
    print("usuario_id: ", usuario_id)
    data = obtenerArrayDatosUsuario(usuario_id)
    data2 = obtenerArrayDatosTarjeta(usuario_id)
    #foto_usuario = obtenerImagenUsuario(usuario_id)  # no se ve (necesita una por defecto) ademas los q no tienen foto no va el perfil
    return render_template('perfil.html', data=data, data2=data2) #, foto_usuario=foto_usuario)


@app.route('/soporte_cliente/')
def ayuda():
    return render_template('soporte_cliente.html')


@app.route('/nueva_pw/', methods=['GET', 'POST'])
def enviarCorreoContrasena():
    usuario = session.get('nombreUsuarioInicio')
    numero_seis_digitos = random.randrange(1000000)  # Genera un número entre 0 y 999999 inclusive
    numero_formateado = f"{numero_seis_digitos:06d}"
    enviar_correo(usuario, numero_formateado)
    if request.method == 'POST':
        usuario = session.get('nombreUsuarioInicio')
        contrasena = request.form.get('nuevaContrasena')
        cambiarContraseña(usuario, contrasena)
        return jsonify({'message': 'Contraseña cambiada exitosamente'})  # Puedes devolver cualquier mensaje que desees
    return render_template('nueva_psswrd.html', numero_formateado=numero_formateado)


@app.route('/desafios_recompensas/')
def desafios():
    return render_template('desafios_recompensas.html')


# direcciones de las categorias de juegos
# idice de juegos de cartas
@app.route('/Juegos/Indice_cartas/', methods=['GET'])
def cartas():
    return render_template('juegosCartas.html')


@app.route('/Juegos/Indice_cartas/Carta_mas_alta/', methods=['GET'])
def A_Jugar():
    DINERO = obtenerDinero()
    return render_template('cartas_antiguo.html', DINERO=DINERO)


@app.route('/Juegos/Indice_cartas/Cartas_de_eleccion/', methods=['GET'])
def A_Elegir():
    DINERO = obtenerDinero()
    return render_template('eleccion.html', DINERO=DINERO)


# indice de juegos de dados
@app.route('/Juegos/Indice_Dados/', methods=['GET'])
def dados():
    return render_template('dice_index.html')


@app.route('/Juegos/Ruleta/')
def ruleta():
    dinero = obtenerDinero()
    return render_template('ruleta.html', dinero=dinero)


@app.route('/Juegos/DinoKongo/', methods=['GET'])
def dino():
    return open('games/dinosaurio/index.html')


@app.route('/Juegos/Eventos/', methods=['GET'])
def event():
    return render_template('eventos.html')


@app.route('/Juegos/Eventos/RuletaRusa', methods=['GET'])
def ruletaRusa():
    DINERO = obtenerDinero()
    return render_template('ruleta_rusa.html', DINERO=DINERO)


@app.route('/Juegos/Eventos/Gashapon', methods=['GET'])
def gashapon():
    DINERO = obtenerDinero()
    print("ENTRA")
    usuario = session.get('nombreUsuarioInicio')
    id_usuario = obtenerId(usuario)
    VALORES = obtenerValoresGashapon(id_usuario)
    print("usuario: ", usuario)
    print("usuario_id: ", id_usuario)
    # Accede directamente al valor asociado a la clave 'pirata'
    pirata = VALORES.get('pirata', 0)  # Si 'pirata' no está en VALORES, devuelve 0
    astronauta = VALORES.get('astronauta', 0)
    rey = VALORES.get('rey', 0)
    capitan = VALORES.get('capitan', 0)
    tigre = VALORES.get('tigre', 0)
    vikingo = VALORES.get('vikingo', 0)
    print("pirata: ", pirata)
    print("astronauta: ", astronauta)
    print("rey: ", rey)
    print("capitan: ", capitan)
    print("tigre: ", tigre)
    print("vikingo: ", vikingo)
    # Pasa las variables a la plantilla
    return render_template('gashapon.html', DINERO=DINERO, PIRATA=pirata, ASTRONAUTA=astronauta, REY=rey,
                           CAPITAN=capitan, TIGRE=tigre, VIKINGO=vikingo, ID=id_usuario)


@app.route('/Juegos/Juegos_extra/', methods=['GET'])
def juegos_extra():
    return render_template('juegosExtra.html')


# dineros
@app.route('/dinero/', methods=['GET'])
def dinero():
    DINERO = obtenerDinero()
    return render_template('dinero.html', DINERO=DINERO)


@app.route('/agregar_dinero', methods=['POST'])
def agregar_dinero():
    cantidad_a_agregar = float(request.form.get('cantidad_a_agregar'))
    agregarDineroTarjeta(cantidad_a_agregar)
    return "Dinero agregado correctamente"


@app.route('/update_columna_gashapon', methods=['POST'])
def update_columna_gashapon():
    id_usuario = request.form.get('id_usuario')  # Obtener el valor de 'id_usuario' de la solicitud POST
    columna = request.form.get('columna')  # Obtener el valor de 'columna' de la solicitud POST
    activarColumnaGashapon(id_usuario, columna)
    return "Columna actualizada correctamente"

@app.route('/avatar_reclamado', methods=['POST'])
def avatarReclamado():
    cantidad_a_agregar = float(request.form.get('reclamar'))
    reclamarAvatar(reclamar)
    return "Avatar reclamado correctamente"


@app.route('/agregar_ganancias', methods=['POST'])
def agregar_ganancias():
    cantidad_a_agregar = float(request.form.get('cantidad_a_agregar'))
    agregarDineroGanado(cantidad_a_agregar)
    return "Dinero agregado correctamente"


@app.route('/retirar_dinero', methods=['POST'])
def retirar_dinero():
    cantidad_a_retirar = float(request.form.get('cantidad_a_retirar'))
    retirarDinero(cantidad_a_retirar)
    return "Dinero retirado correctamente"


@app.route('/Juegos/Juegos_extra/Bingo')
def bingo():
    DINERO = obtenerDinero()
    return render_template('bingo.html', DINERO=DINERO, rooms=ROOMS)


@app.route('/Juegos/Juegos_extra/Slots')
def slots():
    DINERO = obtenerDinero()
    return render_template('Tragaperras.html', DINERO=DINERO)


@app.route('/Juegos/Indice_cartas/Blackjack/', methods=['GET'])
def blackjack():
    DINERO = obtenerDinero()
    return render_template('blackjack.html', DINERO=DINERO)

@app.route('/Juegos/Indice_Dados/Poker/', methods=['GET'])
def poker_dados():
    DINERO = obtenerDinero()
    return render_template("sala_pokerDados.html", DINERO=DINERO, rooms=ROOMSPokerDados)

@app.route('/Juegos/Indice_Dados/Poker/Partida', methods=['GET'])
def poker_dados_partida():
    DINERO = obtenerDinero()
    return render_template("poker_dados.html", DINERO=DINERO)


@app.route('/Juegos/Juegos_extra/KonguitoRun')
def konguito():
    DINERO = obtenerDinero()
    return render_template('konguitoRun.html', DINERO=DINERO)


@app.route('/Juegos/Juegos_extra/Plinko')
def plinko():
    DINERO = obtenerDinero()
    return render_template('plinko.html', DINERO=DINERO)


@app.errorhandler(404)
def page_not_found(error):
    return render_template("pagina_no_encontrada.html"), 404

@app.route('/Juegos/Indice_cartas/Poker/', methods=['GET'])
def poker_texas():
    DINERO = obtenerDinero()
    return render_template('poker_texas.html', DINERO=DINERO)

@app.route('/Juegos/Indice_Dados/Craps/', methods=['GET'])
def craps():
    DINERO = obtenerDinero()
    return render_template("craps.html", DINERO=DINERO)

@app.route('/crear_partidaPokerDados', methods=['POST'])
def crear_partidaPokerDados():
    nombre_partida = request.form.get('nombre_partida')
    if nombre_partida in ROOMSPokerDados:
        return "La partida ya existe"
    ROOMSPokerDados.append(nombre_partida)
    registrarPartidaPokerDados(obtener_nombre(), nombre_partida)
    return "Partida creada correctamente"

@app.route('/crear_partida', methods=['POST'])
def crear_partida():
    nombre_partida = request.form.get('nombre_partida')
    if nombre_partida in ROOMS:
        return "La partida ya existe"
    ROOMS.append(nombre_partida)
    registrarPartida(obtener_nombre(), nombre_partida)
    return "Partida creada correctamente"

@app.route('/eliminar_sala', methods=['POST'])
def eliminar_sala():
    nombre_sala = request.form.get('nombre_sala')
    if nombre_sala in ROOMS:
        ROOMS.remove(nombre_sala)
    return "Sala eliminada correctamente"

@app.route('/eliminar_salaPokerDados', methods=['POST'])
def eliminar_salaPokerDados():
    nombre_sala = request.form.get('nombre_sala')
    if nombre_sala in ROOMSPokerDados:
        ROOMSPokerDados.remove(nombre_sala)
    return "Sala eliminada correctamente"

@app.route('/partidaPokerDados', methods=['GET', 'POST'])
def partidaPokerDados():
    DINERO = obtenerDinero()
    if request.method == 'POST':
        salaElegida = request.form.get('sala')
        if salaElegida not in ROOMSPokerDados:
            return  "Sala no disponible"
        session['salaElegidaPokerDados'] = salaElegida
        return render_template('poker_dados.html', username=obtener_nombre(), rooms=ROOMSPokerDados, salaElegida=salaElegida, DINERO = DINERO)
    salaElegida = session.get('salaElegidaPokerDados')
    return render_template('poker_dados.html', username=obtener_nombre(), rooms=ROOMSPokerDados, salaElegida=salaElegida, DINERO = DINERO)

@app.route('/partidaBingo', methods=['GET', 'POST'])
def partidaBingo():
    if request.method == 'POST':
        salaElegida = request.form.get('sala')
        if salaElegida not in ROOMS:
            return  "Sala no disponible"
        session['salaElegidaBingo'] = salaElegida
        return render_template('partidaBingo.html', username=obtener_nombre(), rooms=ROOMS, salaElegida=salaElegida)
    salaElegida = session.get('salaElegidaBingo')
    return render_template('partidaBingo.html', username=obtener_nombre(), rooms=ROOMS, salaElegida=salaElegida)


@socketio.on("message")
def message(data):
    send({"msg": data["msg"], "username": data["username"], "time_stamp": strftime("%b-%d %I:%M%p", localtime())},
         room=data["room"])
    print(f"{data}")
    # Evento personalizado:
    # emit("some-event", "this is a custom event message")

@socketio.on("join")
def join(data):
    # Antes del send especificar la sala
    join_room(data["room"])
    send({"msg": data["username"] + " se ha unido a la sala " + data["room"]}, room=data["room"])

@socketio.on("joinPokerDados")
def joinPokerDados(data):
    # Antes del send especificar la sala
    join_room(data["room"])
    send({"msg": data["username"] + " se ha unido a la sala " + data["room"]}, room=data["room"])

@socketio.on("preguntarAnfitrion")
def preguntarAnfitrion(data):
    emit("respuestaAnfitrion", room=data["room"])

@socketio.on("fila")
def fila(data):
    send({"msg": data["username"] + " ha conseguido una línea "}, room=data["room"])
    emit("cambiarFila", room=data["room"])

@socketio.on("actualizarUsuarios")
def actualizarUsuarios(data):
    emit("cambiarUsuarios", {"jugadorFaltan": data["jugadores_restantes"]}, room=data["room"])

@socketio.on("dobleFila")
def dobleFila(data):
    send({"msg": data["username"] + " ha conseguido doble línea "}, room=data["room"])
    emit("cambiarDobleFila", room=data["room"])

@socketio.on("bingoCompleto")
def bingoCompleto(data):
    emit("terminarPartida", {"ganador": data["username"]}, room=data["room"])

@socketio.on("empezar")
def empezar(data):
    send({"msg": "EMPIEZA LA PARTIDA"}, room = data["room"])
    emit("numeros_bingo", {"numeros_mostrar_bingo": (data["array_numeros"])},room=data["room"])

@socketio.on("empezarPokerDados")
def empezarPokerDados(data):
    emit("abrirBoton",room=data["room"])

@socketio.on("compartirResultado")
def compartirResultado(data):
    emit("almacenarNumero",{"nombreAlmacenado": (data["username"]), "resultadoAlmacenado": (data["resultado"])}, room=data["room"])

@socketio.on("resultadosRonda")
def resultadosRonda(data):
    emit("mostrarResultado",{"nombreAlmacenado": (data["username"]), "resultadoAlmacenado": (data["resultado"])}, room=data["room"])

@socketio.on("esperando")
def esperando(data):
    send({"msg": "QUEDAN " + str(data["jugadoresRestantes"]) + " PARA EMPEZAR LA PARTIDA"}, room=data["room"])

@socketio.on("anadir")
def anadir(data):
    #Antes del send especificar la sala
    join_room(data["room"])
    emit("nuevo_valor_contador", {"valor": int(data["valor"])}, room=data["room"])

carton_generado = None
@socketio.on("pedirCarton")
def pedirCarton():
    creador = CreadorCarton()
    global carton_generado
    carton_generado = creador.generar_carton()
    emit("cartonRecibido", {"carton_generado": carton_generado})

@socketio.on("valorNumero")
def valorNumero():
    emit("numeroRecibido", {"resultado": int(data["resultado"])}, room=data["room"])


@app.route('/guardar_carton', methods=['POST'])
def guardar_carton():
    global carton_generado
    if carton_generado:
        carton_string = str(carton_generado)
        print(carton_string)
        carton_limpio = re.sub(r'(\'\',\s*)+|(\'\'\])|(\[\'\')', '', carton_string)
        print(carton_limpio)
        guardarCarton(obtener_nombre(), carton_string)
        return "Partida creada correctamente"
    else:
        return "No se ha generado ningún cartón aún"

@app.route('/obtener_carton', methods=['GET'])
def obtener_carton():
    carton = mostrarCarton(obtener_nombre())
    return jsonify({"carton": carton})

@app.route('/buscar_anfitrion', methods=['POST'])
def buscar_anfitrion():
    time.sleep(1)
    nombre_usuario = request.form.get('nombre_usuario')
    resultado = buscarAnfitrion(nombre_usuario)
    return jsonify({'resultado': resultado})

@app.route('/obtener_avatar', methods=['GET'])
def obtener_Avatar():
    usuario = session.get('nombreUsuarioInicio')
    id_usuario = obtenerId(usuario)
    resultado = obtenerAvatar(id_usuario)
    return jsonify({'resultado': resultado})

@app.route('/modificar_avatar', methods=['POST'])
def modificar_Avatar():
    usuario = session.get('nombreUsuarioInicio')
    id_usuario = obtenerId(usuario)
    datos_avatar = request.get_json()
    fondo = datos_avatar.get('backgroundColor')
    personaje = datos_avatar.get('characterImage')
    resultado = modificarAvatar(id_usuario, fondo, personaje)
    return jsonify({'resultado': resultado})

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))  # Obtener el puerto del entorno o usar el 5000 por defecto
    socketio.run(app, host="0.0.0.0", port=port, allow_unsafe_werkzeug=True)
    socketio.run(app, host="0.0.0.0", port=port, allow_unsafe_werkzeug=True)

