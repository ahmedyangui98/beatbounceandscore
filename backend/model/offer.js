const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    rating: { type: Number},
    comment: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    
    }, 
 
}


,{
    timestamps: true
})

const offers = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    image: {
        type: String,
        required: true,

    },
    location: {
        type: String,
        required: true,
    },
    Postname: {
        type: String,
        required: true,

    },
    Postdescription: {
        type: String,
        required: true,

    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0,

    },
    numReviews: { 
        type: Number,
      
        default: 0,
    },
    Companyname: {
        type: String,
        required: true,

    }

}, {
    timestamps: true
})

module.exports = mongoose.model("offers", offers);
