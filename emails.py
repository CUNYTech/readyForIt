import requests
import os
from threading import Thread

API_KEY = os.environ.get("MAILGUN_API_KEY")
MAILGUN_DOMAIN = os.environ.get("MAILGUN_DOMAIN")


def send_simple_message(message, email):
    response = requests.post(
        "https://api.mailgun.net/v3/{}/messages".format(MAILGUN_DOMAIN),
        auth=("api", API_KEY),
        data={"from": "readyforit@example.com",
              "to": "{}".format(email),
              "subject": "Hello",
              "text": message})

    print(response.text)


def send_email(message, email):
    thr = Thread(target=send_simple_message, args=[message, email])
    thr.start()
    return thr
