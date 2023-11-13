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

def obtenerNumero():
    conn = connect()
    valor = None
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para obtener el dinero del usuario
            query = "SELECT valor FROM numero Limit 1"
            cursor.execute(query)
            valor = cursor.fetchone()[0]
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)
    return valor

def sumarValor():
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para obtener el dinero del usuario
            query = "UPDATE numero SET valor = valor + 1"
            cursor.execute(query)
            conn.commit()
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def resetearValor():
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para obtener el dinero del usuario
            query = "UPDATE numero SET valor = 0"
            cursor.execute(query)
            conn.commit()
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)