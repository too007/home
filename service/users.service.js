const { json } = require('body-parser');
//const user = require('../mode/user.model');
//const usermodel = require('../mode/user.model')
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
module.exports = userservice;