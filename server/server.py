from flask import Flask, render_template, request, jsonify
import subprocess, logging, sys
from subprocess import call

app = Flask(__name__)
    
@app.route("/")
def home():
    return render_template("dashboard.html")

@app.route("/pushData", methods=['POST'])
def pushData():
    postcode = request.form["postcode"]
    ans = subprocess.check_output(["python", "writeToData.py", postcode])
    print(ans.decode("utf-8"))
    return(ans.decode("utf-8"))

if __name__ == '__main__':
   app.run(debug=True)
