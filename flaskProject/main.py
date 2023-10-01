from flask import Flask, render_template, request, redirect, url_for
from conexionBBDD import connect, close_connection
app = Flask(__name__)

#@app.route('/')
#def init():
#    return render_template('carga.html')

@app.route('/')
def inicio():
    return render_template('inicio.html')

@app.route('/Juegos/')
def index():
    return render_template('pantallaJuegos.html')  # reconoce automaticamente la carpeta templates y de ahi eliges el html

@app.route('/Registro/')
def registro():
    return render_template('registro.html')

@app.route('/Carta_mas_alta/')
def juego_cartas():
    return open('cartaMasAlta/carta_mas_alta.html')

@app.errorhandler(404)
def page_not_found(error):
 return render_template("pagina_no_encontrada.html"), 404


@app.route('/')
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
    app.run(debug=True) # puedo modificar el puerto por defecto
