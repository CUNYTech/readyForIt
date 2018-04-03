from flask import Flask, render_template, request
from PIL import Image
import os, os.path
import requests
import json
import time


app = Flask(__name__, static_url_path='/static')

@app.route('/temperature', methods=['POST'])

def temperature():

	localtime = time.asctime( time.localtime(time.time()) )
	try:
		img = Image.open('/night.png')
		img.load()
	except:
		print "unable to load image"
	#if localtime.hour >= 18


	zipcode = request.form['zip']
	#r = requests.get('http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&appid=1d778e5f6d7b7adaae0b1ba463254ced')
	r = requests.get('http://api.openweathermap.org/data/2.5/forecast?zip='+zipcode+',us&appid=1d778e5f6d7b7adaae0b1ba463254ced')
	try:
		json_object=r.json()
		temp_k = float(json_object['list'][0]['main']['temp'])
		temp_p = (json_object['list'][1]['main']['pressure'])
		temp_min = (json_object['list'][2]['main']['temp_min'])
		temp_max = (json_object['list'][3]['main']['temp_max'])
		temp_hum = (json_object['list'][4]['main']['humidity'])
		
		#temp_icon = (json_object['list']['weather'][5]['icon']['10d'])
		#req = requests.get('http://openweathermap.org/img/w/10d.png')
		temp_f = (temp_k - 273.15) * 1.8 + 32
		temp_min_conv = (temp_min - 273.15) * 1.8 + 32
		temp_max_conv = (temp_max - 273.15) * 1.8 + 32
		return render_template('temperature.html',temp=temp_f,pressure=temp_p,
			temp_min=temp_min_conv,temp_max=temp_max_conv,hum=temp_hum,time=localtime,night=img)
		#icon=temp_icon
		#return render_template('temperature.html',temp=temp_f, values=values)
		#return render_template('temperature.html')
	except KeyError:
		print(type(json_object))
		return 'sorry bro'


@app.route('/')
def index():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)