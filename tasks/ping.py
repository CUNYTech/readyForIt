import requests


a = requests.get('https://www.readyforit.us/api/ping')
print(a.status_code)
