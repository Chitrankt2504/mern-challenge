const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String },
  price: { type: Number, required: true },
  dateOfSale: { type: Date, required: true },
  isSold: { type: Boolean, default: false },
});

module.exports = mongoose.model('Transaction', transactionSchema);
