require("dotenv").config();

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);



  var getArtist = function(artist) {
    return artist.name;
  };
  
 
  var spotifyThis = function(songName) {
    if (songName === undefined) {
      songName = "The Sign";
    }
  
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error: " + err);
          return;
        }
  
        var songs = data.tracks.items;
  
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtist));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };
  

  var movieThis= function(movieName) {
    if (movieName === undefined) {
      movieName = "Mr Nobody";
    }
  
    var movieUrl =
      "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
    axios.get(movieUrl)
    .then(function(response) {
        var jsonData = response.data;
  
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);

      }
    );
  };

  

  var concertThis = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
    axios.get(queryURL)
    .then(function(response) {
        var jsonData = response.data;
  
        if (!jsonData.length) {
          console.log("No results found for " + artist);
          return;
        }
  
        console.log("Upcoming concerts for " + artist + ":");
  
        for (var i = 0; i < jsonData.length; i++) {
          var show = jsonData[i];
  
            console.log(
            show.venue.city +
              "," +
              (show.venue.region || show.venue.country) +
              " at " +
              show.venue.name +
              " " +
              moment(show.datetime).format("MM/DD/YYYY")
          );
        }
      }
    );
  };



  var doThis = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
  
      var dataArr = data.split(",");
  
      if (dataArr.length === 2) {
        pick(dataArr[0], dataArr[1]);
      } else if (dataArr.length === 1) {
        pick(dataArr[0]);
      }
    });
  };

  
  
  var pick = function(operation, dataSearch) {
    switch (operation) {
    
    case "spotify-this-song":
      spotifyThis(dataSearch);
      break;
    case "movie-this":
      movieThis(dataSearch);
      break;
    case "concert-this":
      concertThis(dataSearch);
      break;
    case "do-what-it-says":
      doThis();
      break;
    default:
      console.log("Error, try again!");
    }
  };


  var startThis = function(firstArgument, secondArgument) {
    pick(firstArgument, secondArgument);
  };
  
  
  
  startThis(process.argv[2], process.argv.slice(3).join(" "));