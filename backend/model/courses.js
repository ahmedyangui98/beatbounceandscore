const mongoose = require("mongoose");
const now = new Date();
const fourMonthsLater = new Date(now.getFullYear(), now.getMonth() + 4, now.getDate());
const courses= new mongoose.Schema({
  
  CourseName: String,
  progression : { type : Number, default : 0},
  type : { type : String,enum: ["sport","musique","dance"],
  default: "sport" },
  level: { type : String,enum: ["easy","medium","hard"],
  default: "easy" },
  creationDate : { type : Date, default : Date.now},
 expirationDate : { type : Date, default : fourMonthsLater},





});
module.exports = mongoose.model("courses", courses);
