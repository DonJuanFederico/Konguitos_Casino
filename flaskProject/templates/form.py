#pip install flask-wtf
#pip install wtforms
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, SelectField, IntegerField, TextAreaField

class inicioSesion(FlaskForm):
    username = StringField(label='Nombre de usuario')
    password = PasswordField(label='Contraseña')
    submit = SubmitField(label='Entrar')