from flask import Flask, render_template, request, jsonify, Response
from BBDD.conexionBBDD import *
from datetime import datetime

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def inicio():
    if request.method == 'POST':
        print("FOTO:")
        foto =request.files['photo']
        print("FOTO PASO 2")
        print("Foto guardada")
        return render_template('inicio.html')
    else:
        return render_template('inicio.html')

@app.route('/Registro/')
def registroUsuario():
    return render_template('registroDatosUsuario.html')


@app.route('/Registro/terminosCondiciones.html')
def terminos():
    return render_template('terminosCondiciones.html')


@app.route('/Tarjeta/', methods=['POST'])
def tarjetaUsuario():
        if request.method == 'POST':
            nombreUsuario = request.form['nombreUsuario']
            contraseña = request.form['contraseña']
            correo = request.form['correo']
            DNI = request.form['DNI']
            dinero = 0.0
            telefono = request.form['telefono']
            foto = None
            fecha_hora = datetime.now()
            calle = request.form['calle']
            codigoPostal = request.form['codigoPostal']
            agregarUsuario(nombreUsuario, contraseña, correo, DNI, dinero, telefono, foto, calle, codigoPostal)
            return render_template('tarjeta.html')

@app.route('/Camara/', methods=['POST'])
def camara():
    if request.method == 'POST':
        print("Tarjeta:")
        numero4 = request.form['numero4']
        numero8 = request.form['numero8']
        numero12 = request.form['numero12']
        numero16 = request.form['numero16']
        numeroTarjeta = numero4 + numero8 + numero12 + numero16
        nombreTitulante = request.form['nombreTitulante']
        dia = request.form['dia']
        mes = request.form['mes']
        caducidad = "2023" + "-" + mes + "-" + dia
        cvv = request.form['cvv']
        agregarTarjeta(numeroTarjeta, nombreTitulante, caducidad, cvv)
        return render_template('camara.html')

@app.route('/RegistroAdministrador/')
def registroAdmin():
    return render_template('registroAdmin.html')


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
@app.route('/Juegos/', methods=['POST'])
def index():
    if request.method == 'POST':
        nombreUsuario = request.form['nombreUsuario']
        contraseña = request.form['contraseña']
        if iniciar_sesion(nombreUsuario, contraseña) == True:
            return render_template('pantallaJuegos.html')
        else:
            return render_template('inicio.html')

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
    return render_template('carta_mas_alta_juego.html')
@app.route('/Juegos/Indice_cartas/Blackjack/', methods=['GET'])
def blackjac():
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

@app.route('/Juegos/Tragaperras/', methods=['GET'])
def tragaperras():
    return render_template('tragaperras.html')

@app.route('/Juegos/DinoKongo/', methods=['GET'])
def dino():
    return open('games/dinosaurio/index.html')

@app.route('/Juegos/Eventos/', methods=['GET'])
def event():
    return render_template('eventos.html')

@app.route('/Juegos_extra/', methods=['GET'])
def juegos_extra():
    return render_template('juegos_extra.html')

# dineros
@app.route('/dinero/', methods=['GET'])
def dinero():
    nombre_usuario = "prueba"
    DINERO = obtenerDinero(nombre_usuario)
    return render_template('dinero.html', DINERO = DINERO)

@app.route('/agregar_dinero', methods=['POST'])
def agregar_dinero():
    nombre_usuario = request.form.get('nombre_usuario')
    cantidad_a_agregar = float(request.form.get('cantidad_a_agregar'))

    # Aquí deberías actualizar el dinero del usuario en tu base de datos
    agregarDinero(nombre_usuario, cantidad_a_agregar)
    return "Dinero agregado correctamente"

@app.route('/retirar_dinero', methods=['POST'])
def retirar_dinero():
    nombre_usuario = request.form.get('nombre_usuario')
    cantidad_a_retirar = float(request.form.get('cantidad_a_retirar'))

    # Aquí deberías retirar el dinero del usuario en tu base de datos
    retirarDinero(nombre_usuario, cantidad_a_retirar)
    return "Dinero retirado correctamente"

@app.errorhandler(404)
def page_not_found(error):
    return render_template("pagina_no_encontrada.html"), 404

if __name__ == '__main__':
    app.run(debug=True)
