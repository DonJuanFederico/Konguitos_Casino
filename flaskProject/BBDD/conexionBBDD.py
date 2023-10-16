# Servidor (Azure): https://portal.azure.com/#@ceu365.onmicrosoft.com/resource/subscriptions/b30aee39-08b5-4718-be30-db1b3f59294e/resourceGroups/Konguitos/providers/Microsoft.DBforMySQL/flexibleServers/konguitoscasino/overview
# Host: konguitoscasino.mysql.database.azure.com
# User: KingKonguito
# Contraseña: Konguito9
# Puerto: 3306 (el predeterminado)
# Ejecutar: "pip install Flask mysql-connector-python" en consola
import hashlib
import io
import os
import cv2
import mysql.connector
from PIL import Image

db_config = {
    "host": "konguitoscasino.mysql.database.azure.com",
    "user": "KingKonguito",
    "password": "Konguito9",
    "database": "casino",
    "port": 3306,
}


def encriptarClave(clave):
    hasher = hashlib.sha256()
    hasher.update(clave.encode('utf-8'))
    return hasher.hexdigest()

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
    contraseña = encriptarClave(contraseña)
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
            cursor.execute(query, (cantidad_a_agregar, obtener_nombre()))
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
            cursor.execute(query, (cantidad_a_retirar, obtener_nombre()))
            conn.commit()
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def agregarUsuario(NombreUsuario, Contraseña, Correo, DNI, Dinero, Telefono, FotoIMG, Calle, CodigoPostal):
    Contraseña = encriptarClave(Contraseña)
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

def tomarFoto():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error al abrir la cámara")
    else:
        # Configurar las dimensiones de captura
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 420)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 360)

    ret, frame = cap.read()
    if ret:
        # Guardar la imagen capturada en la ruta deseada
        cv2.imwrite("imagen_temp.jpg", frame)
        with open("imagen_temp.jpg", "rb") as f:
            img_bytes = io.BytesIO(f.read())
        cap.release()
        os.remove("imagen_temp.jpg")
        return img_bytes.read()
    else:
        print("Error al capturar imagen")
        cap.release()
        return None

def agregarFotoUsuario(nombre_usuario, foto_blob):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Obtener el ID del usuario a partir del nombre de usuario
            query_id = "SELECT id FROM usuarios WHERE NombreUsuario = %s"
            cursor.execute(query_id, (nombre_usuario,))
            resultado = cursor.fetchone()
            if resultado:
                usuario_id = resultado[0]
                # Actualizar la columna FotoIMG con el BLOB de la foto
                query = "UPDATE usuarios SET FotoIMG = %s WHERE id = %s"
                cursor.execute(query, (foto_blob, usuario_id))
                conn.commit()
                print(f"La foto ha sido agregada con éxito al usuario '{nombre_usuario}'.")
                return True
            else:
                print(f"No se encontró el usuario con nombre de usuario '{nombre_usuario}'.")
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

    def crear_administrador(Nombre_Completo, contraseña, correo):
        conn = connect()
        if conn:
            cursor = conn.cursor()
            try:
                # Cifrar la contraseña
                contraseña_cifrada = encriptarClave(contraseña)

                # Insertar el nuevo administrador en la tabla "administradores"
                query = "INSERT INTO administradores (Nombre_Completo, Contraseña, Correo) VALUES (%s, %s, %s)"
                cursor.execute(query, (Nombre_Completo, contraseña_cifrada, correo))
                conn.commit()
                print("Nuevo administrador ha sido agregado con éxito.")
            except mysql.connector.Error as err:
                conn.rollback()
                print(f"Error de MySQL: {err}")
            finally:
                cursor.close()
                close_connection(conn)

    def adminLogIn(nombre, contraseña):
        conn = connect()
        if conn:
            cursor = conn.cursor()
            try:
                # Cifrar la contraseña para compararla con la almacenada en la base de datos
                contraseña_cifrada = encriptarClave(contraseña)

                # Consulta para verificar si el administrador existe
                query = "SELECT id FROM administradores WHERE Nombre_Completo = %s AND Contraseña = %s"
                cursor.execute(query, (nombre, contraseña_cifrada))
                resultado = cursor.fetchone()

                if resultado:
                    print("Inicio de sesión de administrador exitoso")
                    return True
                else:
                    print("Inicio de sesión de administrador fallido: nombre o contraseña incorrectos")
                    return False
            except mysql.connector.Error as err:
                print(f"Error de MySQL: {err}")
                return False
            finally:
                cursor.close()
                close_connection(conn)

    def obtenerImagenUsuario(id_usuario):
        conn = connect()
        if conn:
            cursor = conn.cursor()
            try:
                # Consultar la imagen en formato BLOB para el usuario especificado
                query = "SELECT FotoIMG FROM usuarios WHERE id = %s"
                cursor.execute(query, (id_usuario,))
                resultado = cursor.fetchone()

                if resultado:
                    foto_blob = resultado[0]
                    # Crear una imagen a partir de los datos BLOB
                    imagen = Image.open(io.BytesIO(foto_blob))

                    # Obtener la extensión del archivo (PNG o JPEG)
                    extension = "png" if imagen.format == "PNG" else "jpg"

                    # Guardar la imagen en formato PNG o JPEG según la extensión
                    imagen.save(f"imagen_usuario_{id_usuario}.{extension}")
                    print(f"Imagen guardada como imagen_usuario_{id_usuario}.{extension}")
                else:
                    print("No se encontró la imagen para el usuario con ID:", id_usuario)
            except mysql.connector.Error as err:
                print(f"Error de MySQL: {err}")
            finally:
                cursor.close()
                close_connection(conn)