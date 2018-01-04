from flask import Flask
from flask import render_template, redirect
from flask import send_from_directory

app = Flask(__name__)


@app.route('/')
def dashboard():
    return render_template('support-dashboard.jinja2')


@app.route('/example')
def example():
    return send_from_directory('resources', 'example.json')

if __name__ == '__main__':
    app.run(port=7001, debug=True)
