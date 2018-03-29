from app import create_app, db
from app.models import User
from app.forms import UserForm
from flask_migrate import Migrate
import os
import unittest

app = create_app(os.environ.get('CONFIG') or 'config.DevelopmentConfig')
migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context():
    """Creates shell context for our shell session when using Flask shell
    Gives us access to our app, database and User Model in terminal.
    http://flask.pocoo.org/docs/0.12/cli/#cli

    """
    return dict(app=app, db=db, User=User, UserForm=UserForm)


@app.cli.command()
def test():
    """Runs the unit tests without test coverage."""
    tests = unittest.TestLoader().discover('tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@app.cli.command()
def hello():
    print('hello')
