from flask import Blueprint, render_template, url_for
from app.forms import UserForm
main = Blueprint('main', __name__)

# created rout at index of website then render the index.html tempalte


@main.route('/', methods=['GET'])
def index():
    form = UserForm(csrf_enabled=False)
    return render_template('index.html', form=form)


@main.app_errorhandler(404)
def page_not_found(e):
    return 'Page not found', 404
