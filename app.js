var express = require('express')
var path = require("path");
var app = express();
var port = process.env.PORT || 1337; // FOR AZURE
var counter = 0;
var PubNub = require('pubnub')
const request = require('request');
const sqlite3 = require('sqlite3').verbose();


app.use(express.static(__dirname + "/")); //IMO, leave the user-facing page as the default (less to type on phone), load the dashboard with /dashboard.html

var bodyParser = require('body-parser');
app.use(bodyParser.json()); //makes it easy to send JSON

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})

app.get('/api/getPostCode', function (req, res) {
  var suburbs = require('./NSWLATLON.json');
  suburb = suburbs[Math.floor(Math.random() * suburbs.length)];
  res.send(suburb)
})
