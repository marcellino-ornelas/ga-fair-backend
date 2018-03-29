var express = require('express'),
    router = express.Router(),
    controller = require('../index'),
    bodyParser = require('body-parser');

router.get('/user', controller.users.index);

router.get('/post', controller.posts.index);

router.get('/location', controller.locations.index);

module.exports = router;
