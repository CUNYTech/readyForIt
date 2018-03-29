
# Instantiate flask_wtf forms that offer csrf protection
# https://flask-wtf.readthedocs.io/en/stable/

from flask_wtf import FlaskForm
from wtforms import StringField, ValidationError
from wtforms.validators import DataRequired, Email, Length, Regexp
from app.models import User


def validate_email(form, field):
    if len(field.data) < 6 or len(field.data) > 120:
        raise ValidationError("Invalid Email Length")
    if User.query.filter_by(email=field.data).first():
        raise ValidationError("This Email is already in Use")


class UserForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(), Length(min=2, max=70, message="Invalid Name")])
    phone_number = StringField('phone_number',
                               validators=[Length(min=5, message="Invalid Number")])
    email = StringField('email', validators=[DataRequired(),
                                             Email("This is not a valid email"), validate_email])
    zip_code = StringField('zip_code', validators=[Regexp(r'^\d{5}$',
                                                          message="Please enter valid 5 digit zipcode")])
