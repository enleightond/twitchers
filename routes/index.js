var express = require('express');
var router = express.Router();
var request = require('request');
require('locus');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Twitcher's Digest" });
});

router.get('/dashboard', function(req, res, next) {
	res.render('dashboard', { title: "Twitcher's Digest", games:[],streams:[] });
	
});

router.get('/dashboard/search', function(req,res, next) {
	var twrsQuery = req.query.twitcherSearch;

	var twitchUrl = 'https://api.twitch.tv/kraken/search/games?q=' + twrsQuery + '&type=suggest'
	var twitchUrl2 = 'https://api.twitch.tv/kraken/search/streams?q=' + twrsQuery + '&type=suggest'
	var twitchUrl3 = 'https://api.twitch.tv/kraken/search/streams?q=' + twrsQuery + '&type=suggest'
	var twitchUrl4 = 'https://api.twitch.tv/kraken/search/games?q=' + twrsQuery + '&type=suggest'
	request.get(twitchUrl, function (error, response, body) {
	  	var data = JSON.parse(body);

		request.get(twitchUrl2, function (error, response, body) {
		  	data.streamData = JSON.parse(body);

			request.get(twitchUrl3, function (error, response, body) {
			  	data.streamerData = JSON.parse(body);

				request.get(twitchUrl4, function (error, response, body) {
				  	data.gameImg = JSON.parse(body);


					res.render('dashboard', {title: "Twitcher's Digest", games: data.games, streams: data.streamData.streams, streams: data.streamerData.streams, games: data.gameImg.games } );
				})
			})
		})
	})


	// var twitchUrl = 'https://api.twitch.tv/kraken/search/games?q=' + twrsQuery + '&type=suggest'
	// request.get(twitchUrl, function (error, response, body) {
	//   	var data = JSON.parse(body);
	//   	console.log(data)
	// 	res.render('dashboard', {title: "Twitcher's Digest", streamers: data.streams.channel.display_name});
	// })

});

<<<<<<< HEAD
// $('.twitch-connect').click(function() {
//   Twitch.login({
//     scope: ['user_read', 'channel_read']
//   });
// })

// Twitch.init({clientId: 'tm1iga98r4cytkq9wnaeup1j9m2iroe'}, function(error, status) {
//   if (error) {
//     // error encountered while loading
//     console.log(error);
//   }
//   // the sdk is now loaded
//   if (status.authenticated) {
//     // user is currently logged in
//   }
=======

// router.get('/dashboard/search/:searchString', function(req,res, next) {
// 	var twrsSearch = req.params.searchString;
// 	console.log("This is " + twrsSearch);
>>>>>>> 9dbb5b65b67bf1a9d023a5a1929da499bf41747c
// });

module.exports = router;
