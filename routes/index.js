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

router.post('/signup', function signup(req, res) {

    const body = req.body;
    const user = new User(body);

    user.save(function(err){
      if(err) res.status(500).json({err:err});
      else res.json({success: true, user: user.toWeb(), token: user.getJWT() });
    });
});

module.exports = router;
