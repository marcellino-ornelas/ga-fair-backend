var express = require('express'),
  app = express(),
  controller = require('./controllers'),
  bodyParser = require('body-parser'),
  User = require('./models').User,
  passport = require('passport'),
  routes = require('./routes');
  logger = require('morgan');

CONFIG = {} //Make this global to use all over the application

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'thisisjustalogpassword';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

app.use(logger('dev'));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
  // Configure app
app.use(express.static('public'));          // Static directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // req.body

app.use( passport.initialize());

require('./config/auth')(passport);

app.use(routes);

app.get('/post', controller.posts.index);
app.post('/post', controller.posts.create);
app.get('/post/:id', controller.posts.show);
app.put('/post/:id', controller.posts.update);
app.delete('/post/:id', controller.posts.destroy);

app.get('/location', controller.locations.index);
app.get('/location/:id', controller.locations.show);

app.listen(process.env.PORT || 3001, function() {
  console.log('Server running on http://localhost:3001');
});
