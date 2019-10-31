from flask import Flask, render_template, Response, jsonify, request
import predict

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
		print(type(request.data))
		return 'Active'


if __name__ == '__main__':
	app.run(debug=True)