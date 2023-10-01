from flask import Flask, render_template, request, redirect, url_for
from BBDD.conexionBBDD import connect, close_connection

app = Flask(__name__)

# @app.route('/')
# def init():
#    return render_template('carga.html')


# INICIO, obtiene los datos de la tarjeta del usuario
@app.route('/', methods=['GET', 'POST'])
def inicio():
    if request.method == 'GET':  # GET
        return render_template('inicio.html')
    else:  # POST datosTarjeta
        print("Tarjeta:")
        numero4 = request.form['numero4']
        numero8 = request.form['numero8']
        numero12 = request.form['numero12']
        numero16 = request.form['numero16']
        dia = request.form['dia']
        mes = request.form['mes']
        cvv = request.form['cvv']
        print("Nº Tarjeta:", numero4, numero8, numero12, numero16)
        print("Caducidad:", dia, "/", mes)
        print("CVV:", cvv)
        return render_template('inicio.html')

# REGISTRO USUARIO, introduce datos
@app.route('/Registro/')
def registro():
    return render_template('registro.html')


# RESIDTRO Tarjeta, introduce datos tarjeta y obtiene los datos del formulario del usuario
@app.route('/Usuario/', methods=['POST'])
def tarjeta():
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

#REGISTRO ADMINISTRADOR, introduce datos admin
@app.route('/Registro Administrador/')
def registroAdmin():
    return render_template('registroAdmin.html')

#Interfaz ADMIN, obtiene datos de nuevo registro admin o de inicio de sesion admin
@app.route('/Administrador/', methods=['POST'])
def admin():
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
        try:
            cursor = conn.cursor()
            # Ejemplo de consulta
            cursor.execute("SELECT * FROM administradores")
            resultados = cursor.fetchall()

            return render_template('resultados.html', resultados=resultados)

        finally:
            cursor.close()
            close_connection(conn)
    else:
        return "No se pudo conectar a la base de datos"


if __name__ == '__main__':
    app.run(debug=True)  # puedo modificar el puerto por defecto
