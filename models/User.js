var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Post = require('./Post'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

const SALTCOUNT = 10;

var UserSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

UserSchema.pre('save', function(next){
    const self = this;

    if(this.isModified('password') || this.isNew){

        bcrypt.genSalt(SALTCOUNT, function(err, salt) {

          if( err ) next(err);

          bcrypt.hash(this.password, salt, function(err, hash) {

            if( err ) next(err);
            self.password = hash;
            next();
          });

        });
    } else{
        return next();
    }
})

// added work
UserSchema.methods.comparePassword = function(pw){

    let self = this;
      return new Promise(function(resolve, reject){
          bcrypt.compare(pw, this.password, function(err, pass) {
            if( err ) reject(err);
            if(!pass) reject( new Error("Invalid password") );
            resolve(res);
      });
    });
}

UserSchema.methods.getJWT = function(){
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer "+ jwt.sign({user_id:this._id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
};
UserSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

var User = mongoose.model("User", UserSchema);

module.exports = User;
