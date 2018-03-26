"""File for sending emails out to our Users
For this to work Api key and Mailgun Domain must be set
with Mailgun.
    https://documentation.mailgun.com/en/latest/quickstart-sending.html#send-via-api
"""
import requests
import os
from messages import send_sms
from threading import Thread

API_KEY = os.environ.get("MAILGUN_API_KEY")
MAILGUN_DOMAIN = os.environ.get("MAILGUN_DOMAIN")


def send_simple_message(message, email):
    """This function sends a simple email to our new and old clients.
        Args:
            message (str): The message that will be sent out
            email (str): email address of user.

    """
    response = requests.post(
        "https://api.mailgun.net/v3/{}/messages".format(MAILGUN_DOMAIN),
        auth=("api", API_KEY),
        data={"from": "readyforit@example.com",
              "to": "{}".format(email),
              "subject": "Hello",
              "text": message})

    print(response.text)


def send_email(message, email):
    """Currently used to send emails via threads
    Better idea would be to use celery or another task framework
     for servers with more traffic.
         Args:
            message (str): Message to be sent to client
            email (str): email to be sent to client
        Returns:
            A thread is returned but not currently handled.

    """
    thr = Thread(target=send_simple_message, args=[message, email])
    thr.start()
    return thr
