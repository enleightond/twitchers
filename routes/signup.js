var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var passport = require("passport")
var twitchStrategy = require("passport-twitch").Strategy;

function Users() {
	return knex('users');
}

/* GET users listing. */
router.get('/signup', function(req, res, next) {
	console.log(req.body);
  res.send('respond with a resource');
});


router.get("/auth/twitch", passport.authenticate("twitch"));
router.get("/auth/twitch/callback", passport.authenticate("twitch", { failureRedirect: "/" }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
});

module.exports = router;
