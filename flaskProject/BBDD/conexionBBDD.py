#Servidor (Azure):
#Host: konguitoscasino.mysql.database.azure.com
#User: KingKonguito
#Contraseña: Konguito9
#Puerto: 3306 (el predeterminado)
#Ejecutar: "pip install Flask mysql-connector-python" en consola

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
        print(f"Error de MySQL: {err}")
        return None

def close_connection(conn):
    if conn:
        conn.close()

#cnx = mysql.connector.connect(user="KingKonguito", password="{your_password}",
#                             host="konguitoscasino.mysql.database.azure.com",
#                             port=3306, database="{your_database}",
#                             ssl_ca="{ca-cert filename}",
#                             ssl_disabled=False)