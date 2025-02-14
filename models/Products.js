const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
