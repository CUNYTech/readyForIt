from flask import Blueprint, render_template, redirect, url_for

main = Blueprint('main', __name__)

# created rout at index of website then render the index.html tempalte


@main.route('/')
def index():
	return render_template('index.html')


@main.app_errorhandler(404)
def page_not_found(e):
	return 'Page not found', 404
