from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import json

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('/index.html')

@app.route('/uploadData', methods = ['GET', 'POST'])
def uploadData():
	if request.method == 'POST':
		content = request.get_json();
		with open('data.json', 'w', encoding='utf-8') as f:
    		json.dump(content, f, ensure_ascii=False, indent=4)


if __name__ == '__main__':
	app.run(host='0.0.0.0', port='8000', debug = True)