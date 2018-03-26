"""Tasks for sending sms messages for Twilio
found in the docs from.
https://www.twilio.com/docs/quickstart/python/sms
"""
import os
from twilio.rest import Client
from Threading import Thread


account_sid = os.environ.get("SID")
auth_token = os.environ.get("AUTH_TOKEN")


def send_sms(message=None, phone=os.environ.get("PHONE")):
    """Send messages to Users.
        Args:
            message (str): Message to be send to user 
            phone (str): Phone number to send
    """
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to=phone,
        from_="+18625052547",
        body="Hello from Ready For It!")

    print(message.sid)


def send_async_sms(message=None, phone=None):
    thr = Thread(target=send_sms, args=())
    thr.start()
    return thr
