const { json } = require('body-parser');
//const user = require('../mode/user.model');
const usermodel = require('../models/user.model')

//const usermodel = require('../models/user.model')

class userservice{
    static async registerUser(email,password){
    try{
        const createuser = new usermodel({email,password});
        return  await createuser.save();
    }catch(err){
        throw err;
    }
    } 
    static async getdata(){
        try{
            const data = new usermodel();
            return  await data.find();
        }catch(err){
            throw err;
        }

    }
    static async login(email){
        try{
           return await usermodel({email});
        }catch(err){
            throw err;
        }
        }

    static async generateto(tokenData,secreatkey,jwt_expire){
        return jwt_expire(tokenData,secreatkey,{expireIn:jwt_expire})
    }
}

class us{
    static async senddata(productName,price,qty){
        try{
            const createuse = new us({productName,price,qty});
            return  await usermodel.db.save();
        }catch(err){
            throw err;
        }
        }
}
module.exports =us;
module.exports = userservice;