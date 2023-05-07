const mongoose = require("mongoose");
const financialaid = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    income: { type: Number, required: true },
    expenses: { type: Number, required: true },
    status: { type: String,enum: ['pending', 'approved', 'rejected'],default: 'pending' }
  });
  
  module.exports = mongoose.model('financialaid', financialaid);
