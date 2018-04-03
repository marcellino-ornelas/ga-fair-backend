var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = require('./Post');

var LocationSchema = new Schema({
  country: String,
  city: String,
  image: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}]
});

var Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
