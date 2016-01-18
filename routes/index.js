var express = require('express');
var router = express.Router();
var request = require('request');
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var session = require('cookie-session');
require('locus');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: "Twitcher's Digest" });
});

router.get('/index', function(req, res, next) {
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
var Users = function () {return knex('users');}
router.post('/index', function(req, res, next){
 Users().where({
   name: req.body.username
 }).first().then(function(user){
   if(user) {
     //bcrypt.compareSync will hash the plain text password and compare
     if(bcrypt.compareSync(req.body.password, user.password)) {
       res.cookie.name = user;
       res.redirect('/dashboard');
     } else {
       res.redirect('/index');
     }
   } else {
     res.redirect('/signup');
   }
 });
});

router.post('/index', function (req, res) {
	var salt = bcrypt.genSalt(10, function(err, salt){});		
	var hashpass = bcrypt.hash(req.body.password, salt, function(err, hash) {
		    	knex({password: hash}).then(function(){})});	    		
	var username = req.body.username;


	if (hashpass && username) {
		// SEARCH BY USERNAME
		// COMPARE BCRYPT PASSWORD
		knex('users').where({name: username, password: hashpass})
		// SOMETHING IN THE SESSION

		// AUTHORIZE AND REDIRECT
		res.redirect('/dashboard');
	};

 })

module.exports = router;
