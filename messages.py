import os
from twilio.rest import Client

# Your Account SID from twilio.com/console
account_sid = os.environ.get("SID")
# Your Auth Token from twilio.com/console
auth_token  = os.environ.get("AUTH_TOKEN")

def send_sms(message=None, phone=os.environ.get("PHONE")):
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