import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

smtp_server = 'smtp.gmail.com'
smtp_port = 587
smtp_usuario = 'konguitoscasino@gmail.com'
smtp_password = 'giih cjoo ebyh fkaa'           #kongo1234



def enviar_correo(destinatario, codigoVerificacion):

    # Configuracion de los datos del servidor SMTP y las credenciales
    msg = MIMEMultipart()
    msg['From'] = smtp_usuario
    msg['To'] = destinatario
    msg['Subject'] = "Verificacion de correo"

    # Crea el mensaje con el código de verificación
    mensaje = f'Ya queda poco para que seas un konguito. Tu código de verificación es: {codigoVerificacion}'
    msg.attach(MIMEText(mensaje, 'plain'))

    # Conecta al servidor SMTP y envía el correo
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_usuario, smtp_password)
        server.sendmail(smtp_usuario, destinatario, msg.as_string())
        print("Correo enviado con éxito")
        server.quit()
    except Exception as e:
        print(f"Error al enviar el correo: {str(e)}")