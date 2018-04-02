var express = require('express'),
    router = express.Router(),
    controller = require('../controllers'),
    passport = require('passport'),
    bodyParser = require('body-parser');

// ensure authentication here
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     console.log("User authenticated.");
//     return next(); }
//   res.redirected('/login');
// }

// router.use('/', ensureAuthenticated);

router.get('/user', controller.users.index);

router.get('/post', controller.posts.index);

router.get('/location', controller.locations.index);


router.post('/login', controller.users.login );

router.post('/signup', controller.users.create );

module.exports = router;
