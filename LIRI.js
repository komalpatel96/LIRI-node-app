// load all npms
var keys = require("./keys.js");
var client = keys.twitter;
var spotify = keys.spotify;
var request = require('request');
// var twitter = require('twitter');
// var Spotify = require('node-spotify-api');
// var spotify = require('./keys.js'); //?>?>?>?>?>?>?>?>?>
var fs = require('fs');

var argument = process.argv[2];
var value = process.argv[3];
var dataText = process.argv[4];
//
/*var writeToLog = function(data) {
   fs.appendFile("log.txt", '\r\n\r\n');
 
   fs.appendFile("log.txt", JSON.stringify(data), function(err) {
     if (err) {
       return console.log(err);
     }
 
     console.log("log.txt was updated!");
   });
 }
 
 writeToLog();*/

//running the functions using arguments 
if (argument === "my-tweets" ) {
    getTweets();
}

if (argument === "spotify-this-song" ) {
    getSongs();
}

if (argument === "movie-this") {
    getMovies();
}

if (argument === "do-what-it-says") {
    getAnything();
}


//functions 
function getTweets() {
    var params = {
      screen_name: process.argv[3],
      "count": 20
    };
  
      if(!params){
        params = "_komalpatel";
      console.log("Twitter Handle: " + params);
      }

      client.get('statuses/user_timeline', params, function(error, tweets, response){
       // console.log(tweets);
        if (!error) {
        for(var i = 0; i < tweets.length; i++) {
          console.log("@" + tweets[i].user.screen_name + ": " + 
            tweets[i].text + "\r\n" + tweets[i].created_at + "\r\n" + "-----------" + [i + 1] +"-----------"); 
          }
      }
      else {
        console.log("Error :" + error);
        return;
      }
      });
}

//getTweets();

function getSongs(){
    if(argument === "spotify-this-song"){
        var songTitle = process.argv[3];

      spotify.search({ type: 'track', query: songTitle }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    if(process.argv[3]){
      var track = data.tracks.items[0];
        console.log("Artist name: " + track.artists[0].name);
        console.log("Song name: " + track.name);
        console.log("Song link: " + track.album.href);
        console.log("Album name: " + track.album.name);

        // for (var j=0; j<track.artists.length; j++){
        //               var artist = track.artists[j];
        //               artists.push(artist.name);
        //           }
    }else{
            spotify.search({ type: 'track', query: "summertime sadness"}, function(err, data){
                var track = data.tracks.items[0];
                console.log("Artist name: " + track.artists[0].name); //song track name
                console.log("Song name: " + track.name);
                console.log("Song link: " + track.album.href);
                console.log("Album name: " + track.album.name);
            });
        }
    });
  }
}


function getMovies(){
  if(argument === "movie-this"){ 
    // console.log(process.argv[3]);
    var movieTitle = process.argv[3];
    request("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {

    if (!error && response.statusCode === 200) {
     
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB rating: " + JSON.parse(body).imdbRating);
//ROTTEN TOMATOES RATINGS
      console.log("Rotten tomatoes rating: " + JSON.parse(body).Ratings.Source);

      console.log("Language: " + JSON.parse(body).Language);
      console.log("Movie Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
 }
}

function getAnything(){
  if(argument === "do-what-it-says"){
    fs.readFile('random.txt', "utf8", function(err, data){
        console.log(data);
    });
   // outputText();
  }   
  function outputText(){
      fs.appendFile('log.txt', 'Argument: ' + argument + '. Movie or Song Title: ' + value + '. Movie or Song info: ' + dataText + '.'); 
  } 
}


