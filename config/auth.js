// var LocalStrategy = require('passport-local').Strategy;
// var db = require('..models/index'),
//     User = db.User;

// module.exports = function(passport) {
//   // mange passport sessions
//   passport.serializeUser(function(user,done){
//     done(null, user.id);
//   });
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

//   passport.use('local-signup', new LocalStrategy({
//     usernameField : 'email',
//     passwordField: 'password',
//     passReqToCallback: true // can passback entire request to callback
//     },
//     function(req, email, password, done) {
//       if (req.body.confirmPassword != password) {
//         console.log("Passwords do not match.");
//         return done(null, false, {'confirmPassword': 'Passwords dont match. Try again.'})
//       }
//     // User.findone wont fire unless data is sent back
//       process.nextTick(function() {
//         // VALIDATE: is email unique
//         User.findOne({ 'email' : email }, function(err, user) {
//           if (err) { return done(err); }
//           if (user) {
//             return done(null, false, {'message': 'That email has already been taken.'});
//           } else {
//             // create the user
//             var newUser = new User();
//             newUser.username = req.body.username;
//             newUser.email = email;
//             newUser.password = newUser.generateHash(password);
//             newUser.save(function(err) {
//               if (err){ throw err; }
//             });
//           }
//         });
//       });
//     }
//   ));

// /* ================
//     LOCAL LOGIN
// ==================*/

//   passport.use('local-login', new LocalStrategy({
//     //need to customize local to use email instead of username
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true // cann passback entire request to the callback
//     },
//     function(req, email, password, done) {
//       // Find the user
//       User.findOne({ 'email' : email }, function(err, user) {
//         // return error before anything else
//         if (err) { return done(err); }
//         // if no user found, return message
//         if (!user)
//           return done(null, false, {'message': 'No user found.'});
//         if (!user.validPassword(password))
//           return done(null, false, {'message': 'Uh oh! Wrong Password.'});

//         // on success, return user
//         return done(null, user);
//       });
//     }
//   ));

// }

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models').User;

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done){

      let id = jwt_payload.sub || jwt_payload.user_id;

      User.findOne({id: id }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
      });
    }));
}
