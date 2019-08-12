require("dotenv").config();

var keys = reuire("./keys");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);