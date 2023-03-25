const mongoose = require("mongoose");

/** question model */
const questionModel = new mongoose.Schema({
    questions: { type : Array, default: []}, // create question with [] default value
    answers : { type : Array, default: []},
    type : { type : String,enum: ["sport","musique","dance"],
    default: "sport", },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionModel);
