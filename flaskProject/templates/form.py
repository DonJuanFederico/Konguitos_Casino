#pip install flask-wtf
#pip install wtforms
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, SelectField, IntegerField, TextAreaField

class inicioSesion(FlaskForm):
    username = StringField("Nombre de usuario")
    password = PasswordField()
    submit = SubmitField()

class crearUsuario(FlaskForm):
    username = StringField()
    password = PasswordField()
    email = StringField()
    dni = StringField()
    telephone = StringField()
    street = StringField()
    postalCode = StringField()
    terminus = BooleanField()
    cardNumber = StringField()
    nameHolder = StringField()
    expirationDate = StringField()
    cvv = StringField()
    submit = SubmitField()