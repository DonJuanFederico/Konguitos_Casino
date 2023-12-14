# pip install faker
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

#    !!!!!!!!!!!!!!!!!!!!!!!!   NO EJECUTAR     !!!!!!!!!!!!!!!!!!!!!!!!!
#    !!!!!!!!!!!!!!!!!!!!!!!!   NO EJECUTAR     !!!!!!!!!!!!!!!!!!!!!!!!!
#    !!!!!!!!!!!!!!!!!!!!!!!!   NO EJECUTAR     !!!!!!!!!!!!!!!!!!!!!!!!!
#    !!!!!!!!!!!!!!!!!!!!!!!!   NO EJECUTAR     !!!!!!!!!!!!!!!!!!!!!!!!!
#    !!!!!!!!!!!!!!!!!!!!!!!!   NO EJECUTAR     !!!!!!!!!!!!!!!!!!!!!!!!!
#    !!!!!!!!!!!!!!!!!!!!!!!!   NO EJECUTAR     !!!!!!!!!!!!!!!!!!!!!!!!!
#    !!!!!!!!!!!!!!!!!!!!!!!!   NO EJECUTAR     !!!!!!!!!!!!!!!!!!!!!!!!!


# Si se ejecuta este archivo, genera usuarios que se insertan en la base de datos
# Si se ejecuta este archivo, genera usuarios que se insertan en la base de datos
# Si se ejecuta este archivo, genera usuarios que se insertan en la base de datos
# Si se ejecuta este archivo, genera usuarios que se insertan en la base de datos
# Si se ejecuta este archivo, genera usuarios que se insertan en la base de datos
# Si se ejecuta este archivo, genera usuarios que se insertan en la base de datos
# Si se ejecuta este archivo, genera usuarios que se insertan en la base de datos

import mysql.connector
import random

smtp_server = 'smtp.gmail.com'
smtp_port = 587
smtp_usuario = 'konguitoscasino@gmail.com'
smtp_password = 'kcyksuhopsqzvdld'

nombreUsuario = 'toto'
def obtener_correo_por_usuario(nombre_usuario):
    # Configuración de la base de datos
    db_config = {
        "host": "konguitoscasino.mysql.database.azure.com",
        "user": "KingKonguito",
        "password": "Konguito9",
        "database": "casino",
        "port": 3306,
    }

    try:
        # Conectar a la base de datos
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Consultar el correo electrónico del usuario
        query = "SELECT Correo FROM usuarios WHERE NombreUsuario = %s"
        cursor.execute(query, (nombre_usuario,))
        correo_usuario = cursor.fetchone()

        if correo_usuario:
            return correo_usuario[0]  # Devolver el primer elemento de la tupla (correo electrónico)
        else:
            return None  # Usuario no encontrado

    except mysql.connector.Error as err:
        print(f"Error de MySQL: {err}")
        return None

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

def enviar_correo(nombreUsuario, codigoVerificacion):

    # Configuracion de los datos del servidor SMTP y las credenciales
    correo = obtener_correo_por_usuario(nombreUsuario)

    msg = MIMEMultipart()
    msg['From'] = smtp_usuario
    msg['To'] = correo
    msg['Subject'] = "Verificacion de correo"

    # Crea el mensaje con el código de verificación
    mensaje = f'Ya queda poco para que seas un konguito. Tu código de verificación es: {codigoVerificacion}'
    msg.attach(MIMEText(mensaje, 'plain'))

    # Conecta al servidor SMTP y envía el correo
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_usuario, smtp_password)
        server.sendmail(smtp_usuario, correo, msg.as_string())
        print("Correo enviado con éxito")
        server.quit()
    except Exception as e:
        print(f"Error al enviar el correo: {str(e)}")


def main():
    obtener_correo_por_usuario('toto')
    numero_seis_digitos = random.randrange(1000000)  # Genera un número entre 0 y 999999 inclusive
    numero_formateado = f"{numero_seis_digitos:06d}"
    enviar_correo(nombreUsuario, numero_formateado)

if __name__ == "__main__":
    main()