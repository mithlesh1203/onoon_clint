const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Authentication = async(req, res, next) => {
  try{
    const  token  = req.cookies.jwtoken;
    console.log("🚀 ~ file: Authentication.js:6 ~ Authentication ~ token", token)
    const varifyToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log("🚀 ~ file: Authentication.js:7 ~ Authentication ~ varifyToken", varifyToken)
    const rootUser = await User.findOne({_id:jwt.verifyToken._id,'tokens.token':token})
     if(!rootUser) {
       throw new Error('User not Found')
     }
     req.token = token;
     req.rootUser = rootUser;
     req.userId = rootUser._id;
     next();

  }catch(err) {
    res.status(401).send('Unauthorized: No token provided')
    console.log(err)
  }
};
module.exports = Authentication