# Servidor (Azure):
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

def obtenerDinero(nombre_usuario):
    conn = connect()
    dinero = None
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para obtener el dinero del usuario
            query = "SELECT Dinero FROM usuarios WHERE NombreUsuario = %s"
            cursor.execute(query, (nombre_usuario,))
            dinero = cursor.fetchone()[0]
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)
    return dinero

def agregarDinero(nombre_usuario, cantidad_a_agregar):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para actualizar la cantidad de dinero en la cuenta del usuario
            query = "UPDATE usuarios SET Dinero = Dinero + %s WHERE NombreUsuario = %s"
            cursor.execute(query, (cantidad_a_agregar, nombre_usuario))
            conn.commit()
            print(f"Se han agregado {cantidad_a_agregar} unidades de dinero a la cuenta de {nombre_usuario}.")
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def retirarDinero(nombre_usuario, cantidad_a_retirar):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para actualizar la cantidad de dinero en la cuenta del usuario
            query = "UPDATE usuarios SET Dinero = Dinero - %s WHERE NombreUsuario = %s"
            cursor.execute(query, (cantidad_a_retirar, nombre_usuario))
            conn.commit()
            print(f"Se han retirado {cantidad_a_retirar} unidades de dinero de la cuenta de {nombre_usuario}.")
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
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def agregarTarjeta(NumeroTarjeta,NombreTitular,FechaCaducidad,CVV):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para insertar una nueva tarjeta en la tabla "tarjetas"
            query = "INSERT INTO tarjetas (NumeroTarjeta,NombreTitular,FechaCaducidad,CVV) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (NumeroTarjeta,NombreTitular,FechaCaducidad,CVV))
            conn.commit()
            print(f"Nueva tarjeta de '{NombreTitular}' ha sido agregado con éxito.")
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)