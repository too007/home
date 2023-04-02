const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    images: {
        type: [],
        require: true,
    }
    
})

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel