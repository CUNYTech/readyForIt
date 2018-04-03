from flask import Flask, render_template

app = Flask('testapp')

@app.route('/')
def index():
    return render_template('index.html', variable='12345')

if __name__ == '__main__':
    app.run()