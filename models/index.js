var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wayfare");

module.exports.User = require("./User");
module.exports.Post = require("./Post");
module.exports.Location = require("./Location");
