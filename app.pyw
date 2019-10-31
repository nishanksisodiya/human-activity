from flask import Flask, render_template, Response, jsonify

app = Flask(__name__)
jinja_options = app.jinja_options.copy()
jinja_options.update(dict(
    variable_start_string='[%',
    variable_end_string='%]',
))
app.jinja_options = jinja_options

@app.route('/')
def hello_world():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)