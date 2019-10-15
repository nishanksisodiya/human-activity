from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('/index.html')


if __name__ == '__main__':
	app.run(host='0.0.0.0', port='8000', debug = True)