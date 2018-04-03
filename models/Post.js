var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type:String, required: true },
  image: { type:String, required: true },
  postDescription: { type:String, required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
