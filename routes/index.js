var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Twitcher's Digest" });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: "Twitcher's Digest"  });
});

$('.twitch-connect').click(function() {
  Twitch.login({
    scope: ['user_read', 'channel_read']
  });
})

Twitch.init({clientId: 'tm1iga98r4cytkq9wnaeup1j9m2iroe'}, function(error, status) {
  if (error) {
    // error encountered while loading
    console.log(error);
  }
  // the sdk is now loaded
  if (status.authenticated) {
    // user is currently logged in
  }
});

module.exports = router;
