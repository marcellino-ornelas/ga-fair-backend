var db = require('../models');

module.exports = {
  index: function(req,res){
    db.User.find({}, function(err, allUsers){
      if(err){res.status(500).json({"ERROR":"Database Error"})}
      console.log("allUsers: \n", allUsers)
      res.json({"users": allUsers})
    });
  },

  login: function(req,res){
    const body = req.body;

    db.User.findOne({
      username: req.body.username
    }, function(err, user) {

      if (err || !user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else {

        user.comparePassword(req.body.password)
          .then(function(isMatch){

            if(!isMatch){
              res.json({ success: false, message: 'Authentication failed. Passwords did not match.' })
            }

            res.json({ success: true, token: user.getJWT(), user: user.toWeb() });
          })
          .catch(function(err){
            res.json({ success: false, message: err.message || "Internal server error"})
          })
      }
    });

  },
  create: function(req, res) {
    const body = req.body;
    const user = new db.User(body);

    user.save(function(err){
      if(err) res.json({ success: false, message: "User name already exists. Please choose a different user name." });
      else res.status(200).json({success: true, user: user.toWeb(), token: user.getJWT() });
    });
  },

  // show: function(req,res){
  //   var userId = req.params.id;
  //   db.User.findOne({_id: userId})
  //     .populate('posts')
  //     .exec(function(err, foundUser) {
  //       if(err){res.status(500).json({"ERROR":"Database Error"});}
  //       console.log("foundUser: \n", foundUser);
  //       res.status(200).json({"user": foundUser});
  //     });
  // },

  show: function(req,res){
    var userId = req.params.id;
    db.User.findOne({_id: userId}, function(err, user){
      if(err){res.json({success: false, message: "username not found"});}

      res.status(200).json({success: true, user: user});
    });
  },

  update: function(req, res){
    var updatedUser = req.body;
    var userId = req.params.id
    db.user.findOneAndUpdate({_id: userId}, updatedUser, {new:true}, function(err, updatedUser){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("updatedUser: \n", updatedUser);
      res.status(200).json({"user": updatedUser});
    });
  },

  // destroy: function(req, res){
  //   var userId = req.params.id
  //   db.user.remove({_id: userId}, function(err, removedUser){
  //     if(err){res.status(500).json({"ERROR":"Database Error"});}
  //     console.log("removedUser: \n", removedUser);
  //     res.status(200).json({"user": removedUser});
  //   });
  // }
};
