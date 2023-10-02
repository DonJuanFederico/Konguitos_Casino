from flask import Flask, render_template, request, jsonify, Response
from BBDD.conexionBBDD import connect, close_connection
from datetime import datetime

app = Flask(__name__)


@app.route('/a/', methods=['GET', 'POST'])
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
    return render_template('registro.html')

@app.route('/Registro/terminosCondiciones.html')
def terminos():
    return render_template('terminosCondiciones.html')

@app.route('/Usuario/', methods=['POST'])
def tarjetaUsuario():
        msg = ''
        if request.method == 'POST':
            print("USUARIO:")
            conexion_MySQL = connect()
            print("Se conecta a la BBDD")
            cursor = conexion_MySQL.cursor()
            print("Funciona cursor")
            id = 10
            nombreUsuario = request.form['nombreUsuario']
            contraseña = request.form['contraseña']
            correo = request.form['correo']
            DNI = request.form['DNI']
            dinero = 0.0
            telefono = request.form['telefono']
            foto = "ejemplo.png"
            fecha_hora = datetime.now()
            calle = request.form['calle']
            codigoPostal = request.form['codigoPostal']
            print(id,nombreUsuario,contraseña, correo,DNI,dinero,telefono,foto,fecha_hora,calle,codigoPostal)
            sql = "INSERT INTO casino.usuarios (id, NombreUsuario, Contraseña, Correo, DNI, Dinero, Telefono, FotoIMG, FechaDeCreacion, Calle, CodigoPostal) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql,
                (id, nombreUsuario, contraseña, correo, DNI, dinero, telefono, foto, fecha_hora, calle, codigoPostal))
            conexion_MySQL.commit()
            print("Datos de usuario guardados en la BBDD")
            cursor.close()
            conexion_MySQL.close()
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
        print("Nombre de usuario:", nombreUsuario)
        print("Contraseña:", contraseña)
        return render_template('pantallaJuegos.html')


@app.route('/')
def juego_cartas():
    return open('cartaMasAlta/carta_mas_alta.html')


@app.errorhandler(404)
def page_not_found(error):
    return render_template("pagina_no_encontrada.html"), 404

if __name__ == '__main__':
    app.run(debug=True)
