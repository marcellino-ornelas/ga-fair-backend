var express = require('express'),
  app = express(),
  controller = require('./controllers/index'),
  bodyParser = require('body-parser')
  routes = require('./controllers/routes/api');

  // Configure app
  app.use(express.static('public'));          // Static directory
  app.use(bodyParser.urlencoded({ extended: true })); // req.body

// ROUTES
// json endpoints
app.use('/api', routes);

//listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on http://localhost:3000');
});
