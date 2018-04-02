var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = require('./Post');

var LocationSchema = new Schema({
  country: String,
  city: String,
  image: String
});

var Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
