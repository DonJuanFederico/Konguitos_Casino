import mysql.connector

db_config = {
    "host": "konguitoscasino.mysql.database.azure.com",
    "user": "KingKonguito",
    "password": "Konguito9",
    "database": "casino",
    "port": 3306,
}

def connect():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        print("No se ha podido conectar")
        print(f"Error de MySQL: {err}")
        return None

def close_connection(conn):
    if conn:
        conn.close()

def obtenerNumero(nombreUsuario):
    conn = connect()
    valor = None
    if conn:
        cursor = conn.cursor()
        try:
            query = "SELECT valor FROM partidabingo WHERE nombreJugador = (%s)"
            cursor.execute(query, (nombreUsuario,))
            result = cursor.fetchone()
            if result:  # Comprobar si hay resultados
                valor = result[0]  # Obtener el valor de la consulta
        except mysql.connector.Error as err:
            print(f"Error al obtener el número: {err}")
        finally:
            cursor.close()
            close_connection(conn)
    return valor

def sumarValor(nombreUsuario):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            query = "UPDATE partidabingo SET valor = valor + 1 WHERE nombreJugador = (%s)"
            cursor.execute(query, (nombreUsuario,))
            conn.commit()
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def resetearValor(nombreUsuario):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            query = "UPDATE partidabingo SET valor = 0 WHERE nombreJugador = (%s)"
            cursor.execute(query, (nombreUsuario,))
            conn.commit()
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def buscarAnfitrion(id):
    conn = connect()
    nombre = None
    if conn:
        cursor = conn.cursor()
        try:
            query = "SELECT nombreJugador FROM partidabingo WHERE id = (%s)"
            cursor.execute(query, (id,))
            result = cursor.fetchone()
            if result:  # Comprobar si hay resultados
                nombre = result[0]  # Obtener el valor de la consulta
        except mysql.connector.Error as err:
            print(f"Error al obtener el número: {err}")
        finally:
            cursor.close()
            close_connection(conn)
    return nombre

def guardarPartida(nombre, id):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO partidabingo (nombreJugador, id) VALUES (%s, %s)"
            cursor.execute(query, (nombre, id))
            conn.commit()
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            global nombreUsuario
            nombreUsuario = nombre
            cursor.close()
            close_connection(conn)

def obtenerNombre(id):
    conn = connect()
    valor = None
    if conn:
        cursor = conn.cursor()
        try:
            query = "SELECT nombreJugador FROM partidabingo WHERE id = (%s)"
            cursor.execute(query, (id,))
            result = cursor.fetchone()
            if result:  # Comprobar si hay resultados
                valor = result[0]  # Obtener el valor de la consulta
        except mysql.connector.Error as err:
            print(f"Error al obtener el número: {err}")
        finally:
            cursor.close()
            close_connection(conn)
    return valor