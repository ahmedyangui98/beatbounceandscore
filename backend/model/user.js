const mongoose = require("mongoose");

const users = new mongoose.Schema({
  image:String,
  name: String,
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: {
    type: String,
    enum: ["coach","parent","user","admin"],
    default: "user",
  },
 
});
module.exports = mongoose.model("users", users);
