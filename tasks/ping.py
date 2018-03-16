import requests


a = requests.get('https://www.readyforit.us')
print(a.status_code)
