var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  image: String,
  postDescription: String,
  location: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
