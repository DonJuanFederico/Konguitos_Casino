# pip install faker

import mysql.connector
from faker import Faker
from datetime import datetime
import hashlib


def main():
    # Configuración de la base de datos
    db_config = {
        "host": "konguitoscasino.mysql.database.azure.com",
        "user": "KingKonguito",
        "password": "Konguito9",
        "database": "casino",
        "port": 3306,
    }

    try:
        # Conexión a la base de datos
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Instancia de Faker para generar datos ficticios
        faker = Faker()

        # Función para cifrar contraseñas
        def cifrar_contraseña(contraseña):
            return hashlib.sha256(contraseña.encode()).hexdigest()

        # Generar e insertar 10 usuarios ficticios con contraseñas cifradas
        for _ in range(1000):
            nombre_usuario = faker.user_name()
            contraseña = cifrar_contraseña(faker.password())
            correo = faker.email()
            dni = faker.unique.random_number(8, True)
            dinero = faker.random_int(100, 1000)
            telefono = faker.phone_number()
            fecha_creacion = datetime.now()
            calle = faker.street_address()
            codigo_postal = faker.zipcode()

            dinero_ganado = faker.random_int(0, 10000)

            # Consulta SQL para insertar un usuario ficticio con contraseña cifrada
            query = """
                INSERT INTO usuarios (NombreUsuario, Contraseña, Correo, DNI, Dinero, Telefono, FechaDeCreacion, Calle, CodigoPostal, DineroGanado)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
            nombre_usuario, contraseña, correo, dni, dinero, telefono, fecha_creacion, calle, codigo_postal, dinero_ganado)

            cursor.execute(query, values)

        # Confirmar la transacción
        conn.commit()

    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        # Cerrar la conexión
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()


if __name__ == "__main__":
    main()