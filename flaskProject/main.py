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

app = Flask(__name__)

# Inicializar flask socketio
socketio = SocketIO(app)
ROOMS = []

# python
# import os
# random_bytes = os.urandom(12)
# hex_representation = random_bytes.hex()
# print(hex_representation)
app.config['SECRET_KEY'] = 'ded843028a32eb605772926d'


@app.route('/')
def index():
    return redirect(url_for('inicio'))


@app.route('/Inicio/', methods=['GET', 'POST'])
def inicio():
    form = inicioSesion()
    if form.validate_on_submit():
        nombreUsuarioInicio = form.username.data
        session['nombreUsuario'] = nombreUsuarioInicio
        contraseña = form.password.data
        print("Nombre de usuario:", nombreUsuarioInicio)
        print("Contraseña:", contraseña)
        if adminLogIn(nombreUsuarioInicio, contraseña):
            return interfazAdmin()
        elif iniciar_sesion(nombreUsuarioInicio, contraseña):
            return juegos()
        else:
            print("Inicio de sesión fallido: usuario o contraseña incorrectos, o BBDD apagada")
            return index()
    return render_template('inicio.html', form=form)


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
        session['numeroTarjeta'] = numeroTarjeta
        session['titulanteTarjeta'] = titulanteTarjeta
        session['caducidadTarjeta'] = caducidadTarjeta
        session['cvv'] = cvv
        print("Numero de tarjeta:", numeroTarjeta)
        print("Titulante de tarjeta:", titulanteTarjeta)
        print("Caducidad de tarjeta:", caducidadTarjeta)
        print("CVV de tarjeta:", cvv)
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

        numero = session.get('numeroTarjeta')
        tarjeta = numero.split(" ")
        numeroTarjeta = tarjeta[0] + tarjeta[1] + tarjeta[2] + tarjeta[3]
        fecha = session.get('caducidadTarjeta')
        tarjeta = fecha.split("/")
        fechaCaducidad = "20" + tarjeta[1] + "-" + tarjeta[1] + "-01"
        if agregarUsuario(nombreUsuario, session.get('contraseña'), session.get('correo'), session.get('DNI'), 1000, session.get('telefono'), convertir_imagen_a_blob(photo), session.get('pais'), session.get('codigoPostal'), None):
            print("Exito Usuario")
            if agregarTarjeta(nombreUsuario, numeroTarjeta, session.get('titulanteTarjeta'), fechaCaducidad, session.get('cvv')):
                print("Exito Tarjeta")
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
    return render_template('avatares.html')


@app.route('/Camara/', methods=['GET', 'POST'])
def camara():
    form = TomarFoto()
    if form.validate_on_submit():
        foto = tomarFoto()
        print("a:", foto.__sizeof__())
        nombreUsuario = session.get('nombreUsuario')
        print("a: ", nombreUsuario)
        if agregarFotoUsuario(nombreUsuario, foto):
            print("c")
            return redirect(url_for('camara'))
        return redirect(url_for('camara'))
    return render_template('camara.html', form=form)


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


# Funciones Administrador
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
    return render_template('pantallaJuegos.html', NOMBRE=obtener_nombre())


@app.route('/Rankings/')
def rankings():
    datos_ranking = obtenerRankingDineroGanado()
    print(datos_ranking)
    return render_template('rankings.html', datos_ranking=datos_ranking)


@app.route('/Perfil_de_usuario/', methods=['GET', 'POST'])
def perfil():
    print("ENTRA")
    usuario = session.get('nombreUsuario')
    usuario_id = obtenerId(usuario)
    print("usuario: ", usuario)
    print("usuario_id: ", usuario_id)
    data = obtenerArrayDatosUsuario(usuario_id)
    data2 = obtenerArrayDatosTarjeta(usuario_id)
    return render_template('perfil.html', data=data, data2=data2)


@app.route('/soporte_cliente/')
def ayuda():
    return render_template('soporte_cliente.html')


@app.route('/Perfil_de_usuario/nueva_pw/', methods=['GET', 'POST'])
def enviarCorreoContrasena():
    if request.method == 'POST':
        usuario = session.get('nombreUsuario')
        contrasena = request.form.get('nuevaContrasena')
        cambiarContraseña(usuario, contrasena)
        return jsonify({'message': 'Contraseña cambiada exitosamente'})  # Puedes devolver cualquier mensaje que desees
    return render_template('nueva_psswrd.html')


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
    usuario = session.get('nombreUsuario')
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

@app.route('/Juegos/Indice_cartas/Poker/', methods=['GET'])
def poker_texas():
    DINERO = obtenerDinero()
    return render_template('poker_texas.html', DINERO=DINERO)


@app.route('/Juegos/Indice_Dados/Craps/', methods=['GET'])
def craps():
    DINERO = obtenerDinero()
    return render_template("craps.html", DINERO=DINERO)


@app.route('/Juegos/Indice_Dados/Poker/', methods=['GET'])
def poker_dados():
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


@app.route('/crear_partida', methods=['POST'])
def crear_partida():
    ROOMS.append(request.form.get('nombre_partida'))
    registrarPartida(obtener_nombre(), request.form.get('nombre_partida'))
    return "Partida creada correctamente"


@app.route('/partidaBingo', methods=['GET', 'POST'])
def partidaBingo():
    return render_template('partidaBingo.html', username=obtener_nombre(), rooms=ROOMS)


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

@socketio.on("fila")
def fila(data):
    send({"msg": data["username"] + " ha conseguido una fila "}, room=data["room"])
    emit("cambiarFila",  room=data["room"])

@socketio.on("dobleFila")
def dobleFila(data):
    send({"msg": data["username"] + " ha conseguido doble fila "}, room=data["room"])
    emit("cambiarDobleFila", room=data["room"])

@socketio.on("bingoCompleto")
def bingoCompleto(data):
    emit("terminarPartida", {"ganador": data["username"]}, room=data["room"])

@socketio.on("empezar")
def empezar(data):
    send({"msg": "EMPIEZA LA PARTIDA"}, room = data["room"])
    emit("numeros_bingo", {"numeros_mostrar_bingo": (data["array_numeros"])},room=data["room"])

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
    usuario = session.get('nombreUsuario')
    id_usuario = obtenerId(usuario)
    resultado = obtenerAvatar(id_usuario)
    return jsonify({'resultado': resultado})

@app.route('/modificar_avatar', methods=['POST'])
def modificar_Avatar():
    usuario = session.get('nombreUsuario')
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