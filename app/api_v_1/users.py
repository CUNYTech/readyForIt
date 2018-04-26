from flask import Blueprint, jsonify, request, render_template
from app.models import User
from emails import send_email
from app.forms import UserForm
import requests
from bs4 import BeautifulSoup

import json
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

ACCESS_TOKEN = "419966378-wSgJr91ErWfFuuB9aarqVoeWxa744JNW7PCIARS0"
ACCESS_TOKEN_SECRET = "ROSSCqzlxCHpEoXV5yzOQTJPIw9jza84hzbRGeassAEYB"
CONSUMER_KEY = "e0J0cK3ro44ILVHS923yqV4yf"
CONSUMER_SECRET = "tjGntsCxYfsdUduLTajuVZVbY7406MJdqCvtSem72ToqaYX8ro"
CALLBACK_URL = "twitter.com"

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/register', methods=['POST'])
def register():
    """Api route for validating and saving Our users into database
    Additionalyl sends email and text upon User creations
    """
    form = UserForm(csrf_enabled=False)
    if form.validate():
        new_user = User.create(first_name=form.first_name.data, email=form.email.data,
                               phone_number=form.phone_number.data)

        response = jsonify(
            {'success': form.first_name.data, 'message': 'Success'})

        html = render_template("welcome.html", name=new_user.first_name)
        send_email(html, new_user.email)

        new_user.delete()
        response.status_code = 201
        return response

    response = jsonify({'error': 'Failed',
                        'message': form.errors})
    response.status_code = 400
    return response


@api.route('/ping', methods=['GET'])
def test():
    """Api Route to ping heroku and keep App awake"""
    response = jsonify({'success': 'good job', 'message': 'Pong'})
    response.status_code = 200

    return response

@api.route('/donations/<city>', methods=['GET'])
def donations(city):
    """Api route to collect donations from gofundme"""
    url = "https://www.gofundme.com/emergency-accident-fundraising?term={}&country=US".format(city)
    r=requests.get(url)
    c=r.content

    soup = BeautifulSoup(c, "html.parser")

    all=soup.find_all("div", {"class": "js-fund-tile"})

    # all[0].find("div", {"class": "tile-title"}).text

    results = []
    try:
        for item in all:
            item_dict = {}
            image = item.find("img", {"class": "tile-img"})
            item_dict["image"] = image.attrs['src']
            item_dict["title"] = item.find("div", {"class": "tile-title"}).text
            item_dict["amount"] = item.find("div", {"class" : "tile-footer"}).text.split('\n')[1].rstrip()
            item_dict["description"] = item.find("div", {"class": "tile-description"}).text.strip()
            link = item.find("a", {"class": "read-more"})
            item_dict["link"] = link.attrs['href']
            # adding item to dictinary
            results.append(item_dict)
    except AttributeError as e:
        pass
    
    response = jsonify({'data': results})
    response.status_code = 200
    
    return response


#twiter API Setup
class StdOutListener(StreamListener):
    #https://stackoverflow.com/questions/20863486/tweepy-streaming-stop-collecting-tweets-at-x-amount
    def __init__(self, api = None, max_tweets = 5):
        super(StdOutListener, self).__init__()
        self.num_tweets = 0
        self.max_tweets = max_tweets
        self.tweets = []

    def on_data(self, data):
        if self.num_tweets < self.max_tweets:
            self.tweets.append(data)
            self.num_tweets += 1
            return True
        else:
            return False
        

    def on_error(self, status):
        print(status)
        return False

@api.route('/twitter/<points>/<terms>', methods=['GET'])
def getTweets(points,terms):
    try:
        #setup parms for filter
        locations = [float(point) for point in points.split(',')]
        track = [term for term in terms.split(',')]
        
        l = StdOutListener(max_tweets = 5)
        auth = OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        stream = Stream(auth, l)
        stream.filter(locations = locations, track = track) 
        return jsonify({
            'data' : [json.loads(i) for i in l.tweets],
            'status_code' : 200
        })
    except:
        return jsonify({
            'data' : [],
            'status_code' : 400
        })