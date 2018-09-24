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
    postcode = request.form["postcode"]
    weather = request.form["weather"]
    color = request.form["color"]
    ans = subprocess.check_output(
        ["python", "writeToData.py", postcode, weather, color])
    print(ans.decode("utf-8"))
    return(ans.decode("utf-8"))

@app.route("/getData", methods=["GET"])
def getData():
    df = pd.read_csv("data.csv")
    temp = df.to_dict('records')
    data = [dict(i) for i in temp]
    return (json.dumps(data))

if __name__ == '__main__':
   app.run(debug=True)
