from flask import render_template, redirect, url_for
from app import app

# created rout at index of website then render the index.html tempalte


@app.route('/')
def index():
	return render_template('index.html')
	