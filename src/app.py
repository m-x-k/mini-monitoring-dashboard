from flask import Flask
from flask import render_template, redirect

app = Flask(__name__)


@app.route('/')
def dashboard():
    return render_template('support-dashboard.jinja2')

if __name__ == '__main__':
    app.run(port=7001)
