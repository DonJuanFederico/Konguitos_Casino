# Servidor (Azure): https://portal.azure.com/#@ceu365.onmicrosoft.com/resource/subscriptions/b30aee39-08b5-4718-be30-db1b3f59294e/resourceGroups/Konguitos/providers/Microsoft.DBforMySQL/flexibleServers/konguitoscasino/overview
# Host: konguitoscasino.mysql.database.azure.com
# User: KingKonguito
# Contraseña: Konguito9
# Puerto: 3306 (el predeterminado)
# Ejecutar: "pip install Flask mysql-connector-python" en consola

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

'''
    En este método se llama al método almacenar_nombre() para tener el nombre de usuario guardado y ser usado en otros métodos 
'''
def iniciar_sesion(usuario, contraseña):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para verificar si el usuario y la contraseña son válidos
            query = "SELECT * FROM usuarios WHERE NombreUsuario = %s AND Contraseña = %s"
            cursor.execute(query, (usuario, contraseña))
            resultado = cursor.fetchone()

            if resultado:
                print("Inicio de sesión exitoso")
                almacenar_nombre(usuario)
                return True
            else:
                print("Inicio de sesión fallido: usuario o contraseña incorrectos")
                return False
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)
    return False  # Devuelve False si no se pudo conectar a la base de datos

def almacenar_nombre(usuario):
    global nombreUsuario
    nombreUsuario = usuario

def obtener_nombre():
    return nombreUsuario

def obtenerDinero():
    conn = connect()
    dinero = None
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para obtener el dinero del usuario
            query = "SELECT Dinero FROM usuarios WHERE NombreUsuario = %s"
            cursor.execute(query, (obtener_nombre(),))
            dinero = cursor.fetchone()[0]
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)
    return dinero

def agregarDinero(cantidad_a_agregar):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para actualizar la cantidad de dinero en la cuenta del usuario
            query = "UPDATE usuarios SET Dinero = Dinero + %s WHERE NombreUsuario = %s"
            cursor.execute(query, (cantidad_a_agregar/100, obtener_nombre()))
            conn.commit()
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def retirarDinero(cantidad_a_retirar):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para actualizar la cantidad de dinero en la cuenta del usuario
            query = "UPDATE usuarios SET Dinero = Dinero - %s WHERE NombreUsuario = %s"
            cursor.execute(query, (cantidad_a_retirar/100, obtener_nombre()))
            conn.commit()
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def agregarUsuario(NombreUsuario, Contraseña, Correo, DNI, Dinero, Telefono, FotoIMG, Calle, CodigoPostal):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para insertar un nuevo usuario en la tabla "usuarios"
            query = "INSERT INTO usuarios (NombreUsuario, Contraseña, Correo, DNI, Dinero, Telefono, FotoIMG, Calle, CodigoPostal) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(query, (NombreUsuario, Contraseña, Correo, DNI, Dinero, Telefono, FotoIMG, Calle, CodigoPostal))
            conn.commit()
            print(f"Nuevo usuario '{NombreUsuario}' ha sido agregado con éxito.")
            return True
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def agregarTarjeta(nombre_usuario, NumeroTarjeta, NombreTitular, FechaCaducidad, CVV):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Obtener el ID del usuario a partir del nombre de usuario
            query_id = "SELECT id FROM usuarios WHERE NombreUsuario = %s"
            cursor.execute(query_id, (nombre_usuario,))
            resultado = cursor.fetchone()
            print(resultado)
            print(123)
            if resultado:
                print(455)
                usuario_id = resultado[0]
                print(usuario_id)
                # Insertar los datos de la tarjeta asociada al usuario
                query = "INSERT INTO tarjetas (id, NumeroTarjeta, NombreTitular, FechaCaducidad, CVV) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(query, (usuario_id, NumeroTarjeta, NombreTitular, FechaCaducidad, CVV))
                conn.commit()
                print("Tarjeta agregada con éxito.")
                return True
            else:
                print(f"No se encontró el usuario con nombre de usuario '{nombre_usuario}'.")
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)
