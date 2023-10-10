"""""
from PIL import ImageGrab
import io
import cv2
def tomarFotoNo(path):
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
        cv2.imwrite(path, frame)
        print(f"Imagen guardada en {path}")

            # Mostrar la imagen
        cv2.imshow('Imagen Capturada', frame)
        cv2.waitKey(0)  # Esperar hasta que se presione una tecla
        cv2.destroyAllWindows()  # Cerrar la ventana
    else:
        print("Error al capturar imagen")
        cv2.imwrite(path, frame)
        # Liberar la cámara
    cap.release()
"""
#pip install opencv-python

import cv2
import numpy as np
import io

def tomarFoto():
    try:
        # Inicializar la cámara (0 suele ser la cámara predeterminada)
        cap = cv2.VideoCapture(0)

        # Capturar un solo fotograma desde la cámara
        ret, frame = cap.read()

        # Comprobar si la captura fue exitosa
        if not ret:
            print("No se pudo capturar la foto desde la cámara.")
            return None

        # Convertir la imagen a formato bytes (BLOB)
        img_bytes = io.BytesIO()
        cv2.imwrite(img_bytes, frame)
        img_bytes.seek(0)  # Regresar al inicio del flujo de bytes
        return img_bytes.read()


    except Exception as e:
        print(f"Error al capturar la foto desde la cámara: {str(e)}")
        return None

