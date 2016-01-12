var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Twitcher's Digest" });
});

router.get('/dashboard', function(req, res, next) {
	res.render('dashboard', { title: "Twitcher's Digest"});
});

router.get('/dashboard/search', function(req,res, next) {
	var twrsQuery = req.query.twitcherSearch;

	console.log("This is " + twrsQuery);

	var twitchUrl = 'https://api.twitch.tv/kraken/search/games?q=' + twrsQuery + '&type=suggest'

	request.get(twitchUrl, function (error, response, body) {
	  	var data = JSON.parse(body);
	  	console.log(data)
		//res.render('dashboard', {games: data.games});
	})
	
});

// router.get('/dashboard/search/:searchString', function(req,res, next) {
// 	var twrsSearch = req.params.searchString;
// 	console.log("This is " + twrsSearch);

	
	

// });

module.exports = router;
