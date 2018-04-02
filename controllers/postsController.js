var db = require('../models/index');

module.exports = {
  index: function(req,res){
    db.Post.find({}, function(err, allPosts){
      if(err){res.status(500).json({"ERROR":"Database Error"})}
      console.log("allPosts: \n", allPosts)
      res.json({"posts": allPosts})
    });
  },

  show: function(req,res){
    var postId = req.params.id;
    db.Post.findOne({_id: postId}, function(err, foundPost){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("foundPost: \n", foundPost);
      res.status(200).json({"post": foundPost});
    });
  },

  create: function(req, res){
    var newPost = req.body;
    db.Post.create(newPost, function(err, newPost){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("newPost: \n", newPost);
      res.status(200).json({"post": newPost});
    });
  },

  update: function(req, res){
    var updatedPost = req.body;
    var postId = req.params.id
    db.Post.findOneAndUpdate({_id: postId}, updatedPost, {new:true}, function(err, updatedPost){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("updatedPost: \n", updatedPost);
      res.status(200).json({"post": updatedPost});
    });
  },

  destroy: function(req, res){
    var postId = req.params.id
    db.Post.remove({_id: postId}, function(err, removedPost){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("removedPost: \n", removedPost);
      res.status(200).json({"user": removedPost});
    });
  }

};
