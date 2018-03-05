from app.database import Model, db

# Create user table by import SQLAlchemy database from app module
# http://flask-sqlalchemy.pocoo.org/2.3/


class User(Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    phone_number = db.Column(db.String(20))
    email = db.Column(db.String(120), index=True, unique=True)
    zip = db.Column(db.Integer)

    def __repr__(self):
        return '<User {}>'.format(self.first_name)
