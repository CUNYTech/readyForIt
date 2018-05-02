from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def create_app(config):
    """Application factory style creation of our App as seen
    This pattern is recommended on the Flask official site. 
    http://flask.pocoo.org/docs/0.12/patterns/appfactories/

    Args:
        config (str): name of configuration file to receive settings from
                      config.py file ex: config.DevelopmentConfig

    """

    # Currently sets tempalte and static folder to build. Which is where
    # Our react front end will be placed after running node build.
    app = Flask(__name__, template_folder="build", static_folder="build/static")
    app.config.from_object(config)
    db.init_app(app)
    from app.views.main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    from app.api_v_1.users import api as api_users
    app.register_blueprint(api_users)

    # Returns specific static files that Flask could not find by itself
    # It would be better to have Nginx or another webserver to serve
    # Static Assets but these files are served to a CDN then cached
    # so will be rarely invoked

    @app.route('/index.html')
    def serve_html():
        return send_from_directory('build', 'index.html')

    
    @app.route('/service-worker.js')
    def serve_worker():
        return send_from_directory('build', 'service-worker.js')
    
    @app.route('/favicon2.ico')
    def serve_fav():
        return send_from_directory('build', 'favicon2.ico')
    
    @app.route('/manifest.json')
    def serve_manifest():
        return send_from_directory('build', 'manifest.json')

    
    from app import models


    return app

# Import routes and Models at bottom of file because they depend on creation of app
# importing them last prevents cirulcalar dependencies
# for larger applications app factory is recommended
