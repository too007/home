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

    }
});

 userSchema.method.comparePassword=async function(userPassword){
    try {
        const isMatch = await bcrypt.compare(userPassword,this.password)
        return isMatch;
    } catch (error) {
        
    }
 }

const user= db.model('user',userSchema);

module.exports = user;