var db = require('../models');

// get all users
function index(req, res) {
  db.User.find({}, function(err, allUsers){
    res.json(allUsers);
  });
};

// destroy user
function destroy(req, res) {
  var userId = req.params.user_id;
  db.User.remove({_id:userId}, function(err, foundUser){
      if(err){res.send(err)}
      res.json('deleted a user');
  });
};

module.exports = {
  index: index,
  destroy: destroy
}
