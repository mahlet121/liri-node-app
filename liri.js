//incorporating fs npm for read and write in .txt file
var fs = require("fs");
// incorporating an npm package for doing twitter searches.
var Twitter = require('twitter');
//incorporating tweeter key .js file
var key = require('./Keys.js');
//switch case to run one function at a time
switch (process.argv[2]) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doSays();
        break;
}
//function to get and run tweeters
function tweets() {
    //variable to grab tweeter keys
    var twit = new Twitter(key.twitterKeys);
    //search params
    var params = {
        q: 'BarackObama',
        count: 20,
        result_type: 'recent',
        lang: 'en'
    }
    //geting tweeters from twitter account
    twit.get('search/tweets', params, function(error, tweets, body) {
        //if there is no error run tweets
        if (!error) {
            for (var i = 0; i < tweets.statuses.length; i++) {

                console.log(tweets.statuses[i].text);
            }

        } else {
            console.error(error);
        }


    });
}

//function to get and run musics from spotify
function spotify() {
    //incorporating spotify npm package
    var Spotify = require('node-spotify-api');
    //spotify node api keys
    var spotify = new Spotify({
        id: 'b3bbc0adc91b4b83a1c6cdab24f78609',
        secret: '47159336aa8646b8a35a320bc4860258'
    });
    //search music from spotify by taking users input
    spotify.search({
        type: 'track',
        query: process.argv[3]
    }, function(err, data) {

        //if there is error console.log what the error is
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //else grab the following datas form the music data array
        else {

            var songInfo = data.tracks.items[0];
            console.log(songInfo.artists[0].name);
            console.log(songInfo.name);
            console.log(songInfo.album.name);
            console.log(songInfo.preview_url);
        }

    });
}
//function to get title of the movie from user and display result
function movie() {
    //incorporating request npm package
    var request = require('request');
    //variable to get users movie title
    var movieName = "";
    movieName = process.argv[3];
    //geting movie data from omdbapi by the title of the movie
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    // function to request data
    request(queryUrl, function(error, response, body) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            // Then log the body from the site!

            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).imdbRating);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);

        }

    });
}
//function to read file from .txt file
function doSays() {
    //read the data from random.txt file
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        //split the data by comma
        var data = data.split(",");

        var action = data[0];
        var name = data[1];
        if (action === "spotify-this-song") {
            process.argv[3] = name;
            console.log(spotify());
        }


    });

}
//assign variable to collect data from command line
var newData = process.argv[2];
//write the data from commnd in to log.txt file and split them by comma
fs.appendFile("log.txt", "," + newData, function(err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
        return console.log(err);
    }

    //otherwise wirte in the  log.txt file
});