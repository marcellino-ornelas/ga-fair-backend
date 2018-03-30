var express = require('express'),
  app = express(),
  controller = require('./controllers/index'),
  bodyParser = require('body-parser'),
  controller = require('./controllers'),
  routes = require('./routes/api'),
  logger = require('morgan');


var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var db= require('./models/index');
var User = db.User;

//Prevent CORS errors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Configure app
app.use(express.static('public'));          // Static directory
app.use(bodyParser.urlencoded({ extended: true })); // req.body
app.use(logger('dev'));
// app.use('/api', routes);
app.use(cookieParser());
app.use(session({
  secret: "smallCupCakes",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//passport configuation
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// ROUTES
// json endpoints
app.post('/signup', function signup(req, res) {
  console.log(`${req.body.username} ${req.body.password}`);
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send(newUser);
      });
    }
  )});

app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log("Logging in...")
  res.json(req.user);
})

app.get('/post', controller.posts.index);
app.get('/location', controller.locations.index);

// AUTH ROUTES
app.get('/users', controller.users.index);
app.delete('users/:user_id', controller.users.destroy);
app.post('/signup', function signup(req, res) {
  console.log(`${req.body.username} ${req.body.password}`);
  User.register(new User({ username: req.body.password }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send(newUser);
      });
    }
  )});
  app.post('/login', passport.authenticate('local', function(err, user, info) {
      if (err) { console.log(err);}
      console.log(user)
      console.log(info)
  }), function (req, res) {
    console.log("Logging in...")
    res.json(req.user);
  })

app.get('/logout', function (req, res) {
  console.log("BEFORE logout", req);
  req.logout();
  res.send(req);
  console.log("AFTER logout", req);
});
//listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on http://localhost:3000');
});
