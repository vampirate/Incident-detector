var express = require('express')
var app = express();
var port = process.env.PORT || 1337; // FOR AZURE
var counter = 0;
var pubnub = require("pubnub").init({
  publish_key: "pub-c-9339f7dd-e9a8-41d7-b3a4-037d25972fc2",
  subscribe_key: "sub-c-34f9f230-6ef5-11e4-bcf0-02ee2ddab7fe"
});

/*  -------------------------  */
/*  --  Stuff David Changed  --  */
/*  -------------------------  */

app.use(express.static(__dirname + '/client')); //IMO, leave the user-facing page as the default (less to type on phone), load the dashboard with /dashboard.html

var bodyParser = require('body-parser');
app.use(bodyParser.json()); //makes it easy to send JSON

//Shuffle the array once (when the server starts). Then just serve sequentially to each new user.
function shuffle(originalArray) {
  var tmpCounter = originalArray.length,
    tempVal, i;
  while (tmpCounter > 0) {
    i = Math.floor(Math.random() * tmpCounter);
    tmpCounter--;
    tempVal = originalArray[tmpCounter];
    originalArray[tmpCounter] = originalArray[i];
    originalArray[i] = tempVal;
  }
  return originalArray;
}

var shuffledPostcodes = shuffle(require('./NSWLATLON.json'));

//the code in client.js uses a 'get' request when the page loads.
//this is a route that catches that 'get' request and response with something.
//So in effect this is a function that runs for each new user/refresh, increments the counter and returns that item in the array.

app.get('/api/getPostcode', function (req, res) {
  counter++;
  res.json(shuffledPostcodes[counter]);
  // poss add WURFL here?
});


/*  -----------------------------  */
/*  --  end Stuff David Added  --  */
/*  -----------------------------  */

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})

console.log('Locations Built');