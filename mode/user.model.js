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


const {Schem} =mongoose;

const userSchem = new Schema({
   
    // img:{
    //     type:String,
    //     require:true
    // }
});

 userSchema.method.comparePassword=async function(userPassword){
    try {
        const isMatch = await compare(userPassword,this.password)
        return isMatch;
    } catch (error) {
        
    }
 }
const us=db.model('us',userSchem);
const user= db.model('user',userSchema);
module.exports=us;
module.exports = user;