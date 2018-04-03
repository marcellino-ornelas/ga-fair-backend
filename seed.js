//Queen Regent Stephanie
var db = require('./models');

// var usersList = [
//   {
//     name: "Queen Regent, Stephanie",
//     email: "qrstephanie@gmail.com",
//     password: "123"
//   },
//   {
//     name: "Badass Bill",
//     email: "bbill@gmail.com",
//     password: "456"
//   }
// ];

// var postsList = [
//   {
//     title: "first post",
//     location: "San Francisco",
//     image: "https://sf.curbed.com/2017/7/10/15949390/sf-least-affordable-rent-business",
//     postDescription: "first post: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//   },
//   {
//     title: "second post",
//     location: "San Francisco",
//     image: " ",
//     postDescription: "Back in the bay: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//   },
//   {
//     title: "third post",
//     location: "Sydney",
//     image: "https://lonelyplanetimages.imgix.net/mastheads/65830387.jpg?sharp=10&vib=20&w=1200",
//     postDescription: "Down-under post: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//   },
//   {
//     title: "fourth post",
//     location: "Seattle",
//     image: "https://lonelyplanetimages.imgix.net/mastheads/65830387.jpg?sharp=10&vib=20&w=1200",
//     postDescription: "From the needle: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//   },
//   {
//     title: "fifth post",
//     location: "London",
//     image: "https://lonelyplanetimages.imgix.net/mastheads/65830387.jpg?sharp=10&vib=20&w=1200",
//     postDescription: "Proper post: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//   }
// ];

var locationsList = [
  {
    country: "United States of America",
    city: "San Francisco",
    image: " "
  },
  {
    country: "Australia",
    city: "Sydney",
    image: " "
  },
  {
    country: "England",
    city: "London",
    image: " "
  },
  {
    country: "United States of America",
    city: "Seattle",
    image: " "
  }
];

// db.User.remove({}, function(err, users){
//   if(err) {
//     console.log('Error occured in remove', err);
//   } else {
//     console.log('removed all users');
//
//     // create new records based on seeded users array
//     db.User.create(usersList, function(err, users){
//       if (err) { return console.log('err', err); }
//       console.log("created", users.length, "users");
//       process.exit();
//     });
//   }
// });


db.Location.remove({}, function(err, locations) {
  console.log("remove all locations");
  db.Location.create(locationsList, function(err, locations) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all locations');
    console.log('created ', locations.length, 'locations');

    db.Post.remove({}, function(err, post){
      console.log('removed all posts');
      // postsList.forEach(function (postData) {
      //   var post = new db.Post({
      //     title: postData.title,
      //     location: postData.location,
      //     image: postData.image,
      //     postDescription: postData.postDescription
      //   });
      //   db.Location.findOne({ city: postData.location }, function(err, foundCity) {
      //     console.log(foundCity)
      //     console.log('found location ' + foundCity.city + ' for location ' + post.location);
      //     if (err) {
      //       console.log(err);
      //       return;
      //     }
      //     post.location = foundCity;
      //     post.save(function(err, savedPost){
      //       if (err) {
      //         return console.log(err);
      //       }
      //       console.log('saved ' + savedPost.title + ' with location ' + foundCity.city);
          });
        });
      });
    });
  });
});
