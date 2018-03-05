from flask import Blueprint, abort, jsonify, request
from app.models import User
from app import db
from emails import send_email
from app.forms import UserForm
api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/register', methods=['POST'])
def register():
    form = UserForm()
    if form.validate():
        User.create(first_name=form.first_name.data, email=form.email.data,
                    phone_number=form.phone_number.data)
        response = jsonify({'success': form.first_name.data, 'message': 'Success'})
        response.status_code = 201
        return response

    response = jsonify({'error': 'Failed',
                        'message': form.errors})
    response.status_code = 400
    return response


@api.route('/test', methods=['GET'])
def test():
    response = jsonify({'error': 'bad request', 'message': 'missing args'})
    response.status_code = 400
    return response


@api.route('/email_test', methods=['POST'])
def email():
    message = request.args.get('message')
    email = request.args.get('email')
    send_email(message, email)
    response = jsonify({'success': 'You done good',
                        'message': 'Wow man good'})
    response.status_code = 200
    return response
