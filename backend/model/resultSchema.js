const mongoose = require("mongoose");



/** result model */
const resultModel = new mongoose.Schema({
    username : {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    result : { type : Array, default : []},
    attempts : { type : Number, default : 0},
    points : { type : Number, default : 0},
    achived : { type : String, default : ''},
    createdAt : { type : Date, default : Date.now},
    type : { type : String,enum: ["sport","musique","dance"],
    default: "sport" }
})

module.exports = mongoose.model("result", resultModel);
