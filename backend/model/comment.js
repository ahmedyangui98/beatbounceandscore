const mongoose = require("mongoose");

const comments = new mongoose.Schema({
  dates: Date,
  subject: String,
});
module.exports = mongoose.model("comments", comments);
