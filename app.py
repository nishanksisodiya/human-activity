from flask import Flask, render_template, Response, jsonify, request
from predict import get_result
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
warnings.filterwarnings("ignore")

app = Flask(__name__)
jinja_options = app.jinja_options.copy()
jinja_options.update(dict(
	variable_start_string='[%',
	variable_end_string='%]',
))
app.jinja_options = jinja_options

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/predictaction', methods = ['POST'])
def pred_act():
	if request.method == 'POST':
		accel_data =  request.data.decode("utf-8") 
		accel_data = list(map(float, accel_data.split(',')))
		res = get_result(accel_data)
		return jsonify(res)


if __name__ == '__main__':
	app.run(host='0.0.0.0', port='5000',debug=True, ssl_context='adhoc')