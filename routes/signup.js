var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Users() {
	return knex('users');
}

/* GET users listing. */
router.get('/signup', function(req, res, next) {
	console.log(req.body);
  res.send('respond with a resource');
});

module.exports = router;
