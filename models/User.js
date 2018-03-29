var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Post = require('./Post'),
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  // name: String,
  username: String,
  password: String,
  // post: String
  user_post: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
module.exports = User;
