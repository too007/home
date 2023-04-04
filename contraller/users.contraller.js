const userservice = require('../service/users.service')


exports.register = async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const successRes = await userservice.registerUser(email,password);
        res.json({status:true,success:"user ragister success"});
    }catch(err){
      res.status(500).json({ message: err.message });
    }
}
exports.fechdata = async(req,res)=>{
  try{
      const getdatas = await userservice.getdata();
      res.json(getdatas);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

exports.login = async(req,res,next)=>{
    try{
      const {email,password} = req.body;
      const user =userservice.checkuser(email);
      
      if(!user){
        throw new Error('user dont exites');
      }

      const inMatch= await user.comparePassword(password);
      if(isMatch == false){
        throw new Error('password');

      }
        let tokenData = {_id:user._id,email:user.email};

        const token =await userservice.generatetToken(tokenData,"secretkey",'h1')
        res.status(200).json({status:true,token:tokem})
    }catch(err){
      res.status(500).json({ message: err.message });
    }
}

