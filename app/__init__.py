from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def create_app(config):
    app = Flask(__name__, template_folder="build", static_folder="build/static")
    app.config.from_object(config)
    db.init_app(app)
    from app.views.main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    from app.api_v_1.users import api as api_users
    app.register_blueprint(api_users)

    # Temporary fix until Nginx

    @app.route('/index.html')
    def serve_html():
        return send_from_directory('build', 'index.html')

    
    @app.route('/service-worker.js')
    def serve_worker():
        return send_from_directory('build', 'service-worker.js')
    
    @app.route('/favicon.ico')
    def serve_fav():
        return send_from_directory('build', 'favicon.ico')

    
    from app import models


    return app

# Import routes and Models at bottom of file because they depend on creation of app
# importing them last prevents cirulcalar dependencies
# for larger applications app factory is recommended
