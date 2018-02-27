from app import create_app, db
from flask_migrate import Migrate
import os
import unittest

app = create_app(os.environ.get('CONFIG') or 'config.DevelopmentConfig')
migrate = Migrate(app, db)


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
