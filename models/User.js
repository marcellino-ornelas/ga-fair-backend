var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Post = require('./Post'),
    bcrypt = require('bcrypt');

var UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  // post: String
  user_post: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
