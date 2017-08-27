// Calling variables
var express = require("express");
var cors = require("cors");
var Twit = require("twit");
var config = require("./config");
var path = require("path");

var T = new Twit({
  consumer_key:         config.TConsumerKey,
  consumer_secret:      config.TConsumerKeySecret,
  access_token:         config.TAccessToken,
  access_token_secret:  config.TAccessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var app = express();

// Finding specific files for connection
app.use(cors());
app.use(express.static("./public"));

// jquery
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));

// bootstrap js and css
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));

app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
	next();
});

app.post("/send=:message", function(request, response){
	var message = request.params.message;
	var params = {status:message};
	T.post("statuses/update", params, function(error, tweet, twitterResponse){
		if(!error){
			response.json(tweet);
		} else{
			console.log(error);
		}
	});
});

app.listen(3000);
console.log("Server running on port 3000");