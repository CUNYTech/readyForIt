"""This file contains all of the Configuration classes for our Application
Configurations should be set with environment variables.
ex export CONFIG=config.ProductionConfig 
"""

import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """Base Class for the rest of our configurations. Initializes access
    point for the database and stores Secret Key.
    """
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False
    TESTING = False


class ProductionConfig(Config):
    """This configuration should be used in production and set
    as an environment variable using 
        export CONFIG=config.ProductionConfig  .
    """
    Debug = False


class StagingConfig(Config):
    """Defined variables to be used for staging server."""
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    """The defacto server for testing your application which sets
    debug to true which allows access to Flask's debug mode."""
    DEVELOPMENT = True
    DEBUG = True
    SEND_FILE_MAX_AGE_DEFAULT = 0


class TestingConfig(Config):
    """Config for testing app specifies different temporary database
    for Testing database functionality and not saving it.
    """
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'test.db')
