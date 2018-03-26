from flask import Blueprint, render_template, url_for
from app.forms import UserForm
main = Blueprint('main', __name__)


@main.route('/', methods=['GET'])
def index():
    """ Index of our website for loading our template file and form"""
    form = UserForm(csrf_enabled=False)
    return render_template('index.html', form=form)


@main.app_errorhandler(404)
def page_not_found(e):
    """ Error handler for our index route '/' """
    return 'Page not found', 404
