from flask import Flask, render_template, request, jsonify, Response
from BBDD.conexionBBDD import connect, close_connection, iniciar_sesion, agregarDinero, agregarUsuario
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

@app.route('/Camara/')
def camara():
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


@app.route('/Juegos/', methods=['POST'])
def index():
    if request.method == 'POST':
        nombreUsuario = request.form['nombreUsuario']
        contraseña = request.form['contraseña']
        if iniciar_sesion(nombreUsuario, contraseña) == True:
            return render_template('pantallaJuegos.html')

        else:
            return render_template('inicio.html')


@app.errorhandler(404)
def page_not_found(error):
    return render_template("pagina_no_encontrada.html"), 404

if __name__ == '__main__':
    app.run(debug=True)
