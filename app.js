var express = require('express')
var path = require("path");
var app = express();
var port = process.env.PORT || 1337; // FOR AZURE
var counter = 0;
var PubNub = require('pubnub')
const request = require('request');


var pubnub = new PubNub({
  publishKey: "pub-c-9339f7dd-e9a8-41d7-b3a4-037d25972fc2",
  subscribeKey: "sub-c-34f9f230-6ef5-11e4-bcf0-02ee2ddab7fe"
});

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