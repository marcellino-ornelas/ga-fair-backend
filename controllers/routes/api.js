var express = require('express'),
    router = express.Router(),
    controller = require('../index'),
    bodyParser = require('body-parser');

// ensure authentication here
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("User authenticated.");
    return next(); }
  res.redirected('/login');
}

router.use('/', ensureAuthenticated);

router.get('/user', controller.users.index);

router.get('/post', controller.posts.index);

router.get('/location', controller.locations.index);

module.exports = router;
