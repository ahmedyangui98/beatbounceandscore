const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  quizType: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});


module.exports = mongoose.model("Payment", paymentSchema);
