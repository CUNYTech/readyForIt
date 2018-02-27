from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os


app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 #disable file "cache"
app.config.from_object(os.environ.get('CONFIG') or 'config.DevelopmentConfig')
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models

# Import routes and Models at bottom of file because they depend on creation of app
# importing them last prevents cirulcalar dependencies
# for larger applications app factory is recommended
