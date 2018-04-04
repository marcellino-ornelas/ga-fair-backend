var db = require('../models');
const async = require("async");

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

    Promise.all([db.Location.findOne({ _id: newPost.location }).exec(), db.User.findOne({ _id: newPost.owner }).exec() ])
      .then(function([ location, user ]){

        if(!location || !user ){
          return Promise.reject({})
        }

        db.Post.create(newPost, function(err, newPost){
          if( err || !newPost ){
            return res.json({success: false, message: err.message || "Sorry there was a problem saving your post. Please try again"});
          }

          location.posts.push( newPost._id );
          user.posts.push( newPost._id );

          async.parallel([ location.save.bind(location), user.save.bind(user) ], function(err){
            if(err) res.json({success: false, message: err.message || "Internal server error"})
            res.json({success: true, post: newPost});
          })
        });
      })
      .catch(function(err){
        res.json({success: false, message: (err && err.message) || "Location or user could not be found"})
      })
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
