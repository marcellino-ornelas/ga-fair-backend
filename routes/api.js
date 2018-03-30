var express = require('express'),
    db = require('../models'),
    controller = require('../controllers'),
    router = express.Router(),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    // passport = require('passport'),
    // LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser');

var User = db.User;

// ensure authentication here
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     console.log("User authenticated.");
//     return next(); }
//   res.redirected('/login');
// }

// router.get('/user', ensureAuthenticated, controller.users.index);

//passport configuation
// passport.use(new LocalStrategy(db.User.authenticate()));
// passport.serializeUser(db.User.serializeUser());
// passport.deserializeUser(db.User.deserializeUser());

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
  console.log("IN LOGIN: " + req.user);
  res.send("YO");
});

router.get('/logout', function (req, res) {
  console.log("BEFORE logout", req);
  req.logout();
  res.send(req);
  console.log("AFTER logout", req);
});

module.exports = router;
