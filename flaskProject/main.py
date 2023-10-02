from flask import Flask, render_template, request, jsonify, Response
from BBDD.conexionBBDD import connect, close_connection

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
    return render_template('registro.html')

@app.route('/Registro/terminosCondiciones.html')
def terminos():
    return render_template('terminosCondiciones.html')

@app.route('/Usuario/', methods=['POST'])
def tarjetaUsuario():
    if request.method == 'POST':
        print("USUARIO:")
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



@app.route('/Camara/')
def camara():
    return render_template('camara.html')

@app.route('/RegistroAdministrador/')
def registroAdmin():
    return render_template('registroAdmin.html')


@app.route('/Administrador/', methods=['POST'])
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


@app.route('/Juegos/', methods=['POST'])
def index():
    if request.method == 'POST':
        nombreUsuario = request.form['nombreUsuario']
        contraseña = request.form['contraseña']
        print("Nombre de usuario:", nombreUsuario)
        print("Contraseña:", contraseña)
        return render_template('pantallaJuegos.html')


@app.route('/Carta_mas_alta/')
def juego_cartas():
    return open('cartaMasAlta/carta_mas_alta.html')


@app.errorhandler(404)
def page_not_found(error):
    return render_template("pagina_no_encontrada.html"), 404


# metodo de comprobacion de conexion a la bbdd
@app.route('/a/')
def consultar_datos():
    conn = connect()
    if conn:
        print("Conectado a la base de datos: ", conn)
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM administradores")
            resultados = cursor.fetchall()
            return render_template('resultados.html', resultados=resultados)

        finally:
            cursor.close()
            close_connection(conn)
    else:
        return "No se pudo conectar a la base de datos"


if __name__ == '__main__':
    app.run(debug=True)
