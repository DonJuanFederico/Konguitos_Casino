# Servidor (Azure): https://portal.azure.com/#@ceu365.onmicrosoft.com/resource/subscriptions/b30aee39-08b5-4718-be30-db1b3f59294e/resourceGroups/Konguitos/providers/Microsoft.DBforMySQL/flexibleServers/konguitoscasino/overview
# Host: konguitoscasino.mysql.database.azure.com
# User: KingKonguito
# Contraseña: Konguito9
# Puerto: 3306 (el predeterminado)
# Ejecutar: "pip install Flask mysql-connector-python" + "pip install requests" en consola
import hashlib
import io , os, cv2, mysql.connector
import requests
from PIL import Image
import requests

db_config = {
    "host": "konguitoscasino.mysql.database.azure.com",
    "user": "KingKonguito",
    "password": "Konguito9",
    "database": "casino",
    "port": 3306,
}


def obtener_pais_desde_direccion(direccion):
    # Reemplaza 'TU_CLAVE_DE_API' con tu clave de API de Google Maps
    api_key = 'TU_CLAVE_DE_API'
    url = f'https://maps.googleapis.com/maps/api/geocode/json?address={direccion}&key={api_key}'

    try:
        response = requests.get(url)
        data = response.json()

        if data['status'] == 'OK':
            pais = None

            for component in data['results'][0]['address_components']:
                if 'country' in component['types']:
                    pais = component['long_name']

            return pais
        else:
            return None
    except Exception as e:
        print(f'Error en la solicitud de geocodificación: {str(e)}')
        return None

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

def agregarDineroTarjeta(cantidad_a_agregar):           #Este metodo no afecta a los rankings ya que solo agrega dinero a dinero (se usa para meter dinero a traves de la tarjeta)
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

def agregarDineroGanado(cantidad_a_agregar):     #Este metodo agrega el dinero que se ha ganado jugando a juegos (lo agrega a dinero ganado y a dinero)
        conn = connect()
        if conn:
            cursor = conn.cursor()
            try:
                # Consulta para actualizar la cantidad de dinero y dinero ganado en la cuenta del usuario
                query = "UPDATE usuarios SET Dinero = Dinero + %s, DineroGanado = DineroGanado + %s WHERE NombreUsuario = %s"
                cursor.execute(query, (cantidad_a_agregar, cantidad_a_agregar, obtener_nombre()))
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

def agregarUsuario(NombreUsuario, Contraseña, Correo, DNI, Dinero, Telefono, FotoIMG, Calle, CodigoPostal, Avatar):
    Contraseña = encriptarClave(Contraseña)
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta para insertar un nuevo usuario en la tabla "usuarios"
            query = "INSERT INTO usuarios (NombreUsuario, Contraseña, Correo, DNI, Dinero, Telefono, FotoIMG, Calle, CodigoPostal, Avatar) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(query, (NombreUsuario, Contraseña, Correo, DNI, Dinero, Telefono, FotoIMG, Calle, CodigoPostal, Avatar))
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
                return True
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


def editarTarjeta(id_tarjeta, numero_tarjeta, nombre_titular, fecha_caducidad, cvv):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Actualizar los datos de la tarjeta en la tabla "tarjetas"
            query = "UPDATE tarjetas SET NumeroTarjeta = %s, NombreTitular = %s, FechaCaducidad = %s, CVV = %s WHERE id = %s"
            cursor.execute(query, (numero_tarjeta, nombre_titular, fecha_caducidad, cvv, id_tarjeta))
            conn.commit()
            print(f"Tarjeta con ID {id_tarjeta} ha sido actualizada con éxito.")
            return True
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
            return False
        finally:
            cursor.close()
            close_connection(conn)
            return False  # En caso de error

def editarForoImagen(id_usuario, nueva_foto_img):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Actualizar la columna "ForoIMG" del usuario en la tabla "usuarios"
            query = "UPDATE usuarios SET FotoIMG = %s WHERE id = %s"
            cursor.execute(query, (nueva_foto_img, id_usuario))
            conn.commit()
            print(f"Imagen del foto para el usuario con ID {id_usuario} ha sido actualizada con éxito.")
            return True
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
            return False
        finally:
            cursor.close()
            close_connection(conn)

def editarUsuario(id_usuario, nombre_usuario, correo, dni, dinero, telefono, calle, codigo_postal):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Actualizar los datos del usuario en la tabla "usuarios" sin modificar la fecha de creación
            query = "UPDATE usuarios SET NombreUsuario = %s, Correo = %s, DNI = %s, Dinero = %s, Telefono = %s, Calle = %s, CodigoPostal = %s WHERE id = %s"
            cursor.execute(query, (nombre_usuario, correo, dni, dinero, telefono, calle, codigo_postal, id_usuario))
            conn.commit()
            print(f"Usuario con ID {id_usuario} ha sido actualizado con éxito.")
            return True
        except mysql.connector.Error as err:
            conn.rollback()
            print(f"Error de MySQL: {err}")
            return False
        finally:
            cursor.close()
            close_connection(conn)

def obtenerUsuariosConTarjetas():
    conn = connect()
    if conn:
        cursor = conn.cursor(dictionary=True)
        try:
            # Consulta SQL para obtener todos los usuarios y sus tarjetas
            query = """
            SELECT usuarios.id AS UsuarioID, usuarios.NombreUsuario, usuarios.Correo,
                   usuarios.DNI, usuarios.Dinero, usuarios.Telefono, usuarios.FechaDeCreacion,
                   usuarios.Calle, usuarios.CodigoPostal,
                   tarjetas.id AS TarjetaID, tarjetas.NumeroTarjeta, tarjetas.NombreTitular, tarjetas.FechaCaducidad, tarjetas.CVV
            FROM usuarios
            LEFT JOIN tarjetas ON usuarios.id = tarjetas.id
            """
            cursor.execute(query)
            resultados = cursor.fetchall()

            return resultados  # Devuelve la lista de usuarios con sus tarjetas
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def obtenerArrayDatosUsuario(id_usuario):
    conn = connect()
    if conn:
        cursor = conn.cursor(dictionary=True)
        try:
            # Consulta SQL para obtener los datos del usuario por ID (excluyendo ForoIMG y Contraseña)
            query = """
            SELECT NombreUsuario, Correo, DNI, Dinero, Telefono, FechaDeCreacion, Calle, CodigoPostal
            FROM usuarios
            WHERE id = %s
            """
            cursor.execute(query, (id_usuario,))
            resultado = cursor.fetchone()

            if resultado:
                # Crear un array con los datos del usuario
                datos_usuario = [resultado["NombreUsuario"], resultado["Correo"], resultado["DNI"], resultado["Dinero"],
                                 resultado["Telefono"], resultado["FechaDeCreacion"], resultado["Calle"], resultado["CodigoPostal"]]
                return datos_usuario
            else:
                print("Usuario con ID", id_usuario, "no encontrado.")
                return None
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def obtenerArrayDatosTarjeta(id_usuario):
    conn = connect()
    if conn:
        cursor = conn.cursor(dictionary=True)
        try:
            # Consulta SQL para obtener los datos de la tarjeta por ID (excluyendo FotoIMG y Contraseña)
            query = """
            SELECT NumeroTarjeta, NombreTitular, FechaCaducidad, CVV
            FROM tarjetas
            WHERE id = %s
            """
            cursor.execute(query, (id_usuario,))
            resultado = cursor.fetchone()

            if resultado:
                # Crear un array con los datos de la tarjeta
                datos_tarjetas = [resultado["NumeroTarjeta"], resultado["NombreTitular"], resultado["FechaCaducidad"], resultado["CVV"]]
                return datos_tarjetas
            else:
                print("Usuario con ID", id_usuario, "no encontrado.")
                return None
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def obtenerId(nombre_usuario):
    try:
        # Establish a connection
        with connect() as conn:
            # Create a cursor using a context manager
            with conn.cursor(dictionary=True) as cursor:
                # SQL query to obtain the user ID
                query = "SELECT id FROM usuarios WHERE NombreUsuario = %s"
                cursor.execute(query, (nombre_usuario,))
                result = cursor.fetchone()

                # Return the user ID or None if not found
                return result['id'] if result else None

    except mysql.connector.Error as err:
        # Log the error instead of printing
        print(f"Error de MySQL: {err}")
        # Return an appropriate value or raise an exception based on your requirements
        return None

def obtenerDineroGanado(nombre_usuario):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            # Consulta SQL para obtener DineroGanado por nombre de usuario
            query = "SELECT DineroGanado FROM usuarios WHERE NombreUsuario = %s"
            cursor.execute(query, (nombre_usuario,))
            resultado = cursor.fetchone()

            if resultado:
                dinero_ganado = resultado[0]
                return dinero_ganado
            else:
                print("Usuario con nombre", nombre_usuario, "no encontrado.")
                return None
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def obtenerRankingDineroGanado():
    conn = connect()
    if conn:
        cursor = conn.cursor(dictionary=True)  # Establecer el cursor para devolver resultados como diccionarios
        try:
            # Consulta SQL para obtener los 50 mejores usuarios con su correspondiente DineroGanado y Calle,
            # ordenado de mas a menos dinero ganado
            query = "SELECT NombreUsuario, DineroGanado, Calle FROM usuarios ORDER BY DineroGanado DESC LIMIT 50"
            cursor.execute(query)
            resultados = cursor.fetchall()

            # Modificar la información del usuario para incluir el país en lugar de la calle y el número en el ranking
            usuarios_con_dinero = []

            for i, row in enumerate(resultados, start=1):
                nombre_usuario = row["NombreUsuario"]
                dinero_ganado = row["DineroGanado"]
                calle = row["Calle"]

                # Agregar la información del usuario a la lista con el número en el ranking
                usuarios_con_dinero.append(
                    { "NombreUsuario": nombre_usuario, "DineroGanado": dinero_ganado, "Calle": calle,"Ranking": i})

            return usuarios_con_dinero
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def guardarCarton(nombre, carton):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO carton (nombreJugador, numerosCarton) VALUES (%s, %s)"
            cursor.execute(query, (nombre, carton))
            conn.commit()
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def mostrarCarton(nombre):
    conn = connect()
    carton = None
    if conn:
        cursor = conn.cursor()
        try:
            query = "SELECT numerosCarton FROM carton WHERE nombreJugador = (%s)"
            cursor.execute(query, (nombre,))
            result = cursor.fetchone()
            if result:  # Comprobar si hay resultados
                carton = result[0]  # Obtener el valor de la consulta
        except mysql.connector.Error as err:
            print(f"Error al obtener el número: {err}")
        finally:
            cursor.close()
            close_connection(conn)
    return carton

def registrarPartida(nombreUsuario, nombrePartida):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO partidaBingo (nombreJugador, id) VALUES (%s, %s)"
            cursor.execute(query, (nombreUsuario, nombrePartida))
            conn.commit()
        except mysql.connector.Error as err:
            print(f"Error de MySQL: {err}")
        finally:
            cursor.close()
            close_connection(conn)

def buscarAnfitrion(nombre):
    conn = connect()
    if conn:
        cursor = conn.cursor()
        try:
            query = "SELECT nombreJugador FROM partidabingo WHERE nombreJugador = (%s)"
            cursor.execute(query, (nombre,))
            result = cursor.fetchone()
            if result:
                return True  # Devuelve True si se encuentra el nombre
        except mysql.connector.Error as err:
            print(f"Error al obtener el número: {err}")
        finally:
            cursor.close()
            close_connection(conn)
    return False  # Devuelve False si no se encuentra el nombre
