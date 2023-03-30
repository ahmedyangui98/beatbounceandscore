const mongoose = require("mongoose");

const chapter= new mongoose.Schema({
 content:String,
 course: {type: mongoose.Schema.Types.ObjectId, ref: 'courses'},

});
module.exports = mongoose.model("chapter", chapter);