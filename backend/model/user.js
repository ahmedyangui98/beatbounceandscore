const mongoose = require("mongoose");

const users = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: {
    type: String,
    enum: ["coach","parent","user","admin"],
    default: "user",
  },
  image:String, 
  gender: {
    type: String,
    enum: ["male","female"],
    require: true
  },
  birthdate:{ type: Date, require: true },
  lastLogin: {
    type: Date,
    default: new Date()
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: String,
    enum: ["true","false"],
    default: "false",
  },
  verified : {
    type : Boolean,
    default : false,
    // required: true,

  }
  ,
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifytoken:{
        type: String,
    }
 
});
users.statics.countByRole = async function() {
  try {
    const count = await this.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    return count;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

users.statics.countByGender = async function() {
  try {
    const count = await this.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);
    return count;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


module.exports = mongoose.model("users", users);
