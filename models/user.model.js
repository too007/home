const mongoose = require('mongoose');
const db = require('../config/db');


const {Schema} =mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        lowercase:true,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true

    },
    
});

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    
  });
  
  const Product = mongoose.model('Product', productSchema);
  
  module.exports = Product;
  
  

 userSchema.method.comparePassword=async function(userPassword){
    try {
        const isMatch = await compare(userPassword,this.password)
        return isMatch;
    } catch (error) {
        
    }
 }
//const us=db.model('us',userSchem);
const user= db.model('user',userSchema);
//module.exports=us;
module.exports = user;