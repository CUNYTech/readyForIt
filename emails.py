import requests
import os


API_KEY = os.environ.get("MAILGUN_API_KEY")
MAILGUN_DOMAIN = os.environ.get("MAILGUN_DOMAIN")
MAILGUN_LOGIN = os.environ.get("MAILGUN_SMTP_LOGIN")
email = "marcuscrowder20@gmail.com"

print(API_KEY)
print(MAILGUN_DOMAIN)
print(MAILGUN_LOGIN)


def send_simple_message():
    response = requests.post(
        "https://api.mailgun.net/v3/{}/messages".format(MAILGUN_DOMAIN),
        auth=("api", API_KEY),
        data={"from": "hello@example.com",
              "to": "{}".format(email),
              "subject": "Hello",
              "text": "Testing some Mailgun awesomness!"})

    print(response.text)


send_simple_message()
