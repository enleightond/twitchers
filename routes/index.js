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

	var twitchUrl = 'https://api.twitch.tv/kraken/search/games?q=' + twrsQuery + '&type=suggest';
	var twitchUrl2 = 'https://api.twitch.tv/kraken/search/streams?q=' + twrsQuery + '&type=suggest';
	var twitchUrl3 = 'https://api.twitch.tv/kraken/search/streams?q=' + twrsQuery + '&type=suggest';
	var twitchUrl4 = 'https://api.twitch.tv/kraken/search/games?q=' + twrsQuery + '&type=suggest';
	request.get(twitchUrl, function (error, response, body) {
	  	var data = JSON.parse(body);

		request.get(twitchUrl2, function (error, response, body) {
		  	data.streamData = JSON.parse(body);

			request.get(twitchUrl3, function (error, response, body) {
			  	data.streamerData = JSON.parse(body);

				request.get(twitchUrl4, function (error, response, body) {
				  	data.gameImg = JSON.parse(body);


					res.render('dashboard', {title: "Twitcher's Digest", games: data.games, streams: data.streamData.streams, streams: data.streamerData.streams, games: data.gameImg.games } );
				});
			});
		});
	});
});

module.exports = router;
