var express = require('express'),
    db = require('../models'),
    controller = require('../controllers'),
    router = express.Router(),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser');

var User = db.User;

router.get('/post', controller.posts.index);
router.get('/location', controller.locations.index);

// AUTH ROUTES
router.get('/users', controller.users.index);
router.delete('users/:user_id', controller.users.destroy);
router.post('/signup', function signup(req, res) {
  console.log(`${req.body.username} ${req.body.password}`);
  User.register(new User({ username: req.body.password }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send(newUser);
      });
    }
  )});
router.post('/login', function (req, res) {
  passport.authenticate('local')(req, res, function() {
    res.send(newUser);
  });
});

router.get('/logout', function (req, res) {
  console.log("BEFORE logout", req);
  req.logout();
  res.send(req);
  console.log("AFTER logout", req);
});

module.exports = router;
