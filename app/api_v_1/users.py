from flask import Blueprint, abort, jsonify, request
from app.models import User
from app import db

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/register', methods=['POST'])
def register():
    first_name = request.form['name']
    email = request.form['email']
    phone_number = request.form['phone']
    if '@' in email and '.' in email:
        new_user = User(first_name=first_name, email=email, phone_number=phone_number)
        db.session.add(new_user)
        db.session.commit()
        response = jsonify({'success': first_name, 'message': email})
        response.status_code = 201
        return response
    else:
        response = jsonify({'error': 'Bad Request',
                            'message': 'Please ignore'})
        response.status_code = 400
        return response


@api.route('/test', methods=['GET'])
def test():
    response = jsonify({'error': 'bad request', 'message': 'missing args'})
    response.status_code = 400
    return response
