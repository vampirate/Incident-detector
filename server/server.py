from flask import Flask, render_template, request, jsonify
import subprocess, logging, sys
from subprocess import call
import pandas as pd
import json

app = Flask(__name__)
    
@app.route("/")
def home():
    return render_template("dashboard.html")

@app.route("/pushData", methods=["POST"])
def pushData():
    suburb = request.form["suburb"]
    postcode = request.form["postcode"]
    weather = request.form["weather"]
    color = request.form["color"]
    ans = subprocess.check_output(
        ["python", "writeToData.py", suburb, postcode, weather, color])
    print("Pushed data")
    return(ans.decode("utf-8"))

@app.route("/getData", methods=["GET"])
def getData():
    df = pd.read_csv("data.csv")
    temp = df.to_dict('records')
    data = [dict(i) for i in temp]
    print("Got data")
    return (json.dumps(data))

@app.route("/deleteData", methods=["GET"])
def deleteData():
    df = pd.read_csv("data.csv")
    df = df[:0]
    df.to_csv("data.csv", index=False)
    temp = df.to_dict('records')
    data = [dict(i) for i in temp]
    print("Deleted data")
    return (json.dumps(data))

@app.after_request
def add_header(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

if __name__ == '__main__':
   app.run(debug=True)
