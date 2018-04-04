var express = require('express'),
    router = express.Router(),
    controller = require('../controllers'),
    passport = require('passport'),
    bodyParser = require('body-parser');

router.get('/users', controller.users.index);
router.get("/users/:id", controller.users.show )
router.post('/signup', controller.users.create );

// router.get('/post', controller.posts.index);

router.get('/location', controller.locations.index);


router.post('/login', controller.users.login );


module.exports = router;
