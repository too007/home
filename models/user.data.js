const mongoose = require('mongoose');
const db = require('../config/db');


const {Schema} =mongoose;


const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  
});

const Product = db.model('Product', productSchema);

module.exports = Product;

