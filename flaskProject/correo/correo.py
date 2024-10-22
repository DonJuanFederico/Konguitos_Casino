import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from BBDD.conexionBBDD import obtener_correo_por_usuario

smtp_server = 'smtp.gmail.com'
smtp_port = 587
smtp_usuario = 'konguitoscasino@gmail.com'
smtp_password = 'kcyksuhopsqzvdld'           #kongo1234Aa       -----      kcyk suho psqz vdld



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