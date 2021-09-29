const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')
const authenticate = async (req, res, next) =>{
    try{
        const token = req.headers.cookie.slice(8,)
        console.log(token)
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token": token})
        if(!rootUser){
            return res.status(400).json({ error: "User not found" })
        }
        else{
            req.token = token
            req.rootUser = rootUser
            req.userID = rootUser._id
            next()
        }
        
        
    }
    catch(err){
        res.status(401).send("Unauthorized: No token provided")
        console.log(err);
    }
}

module.exports = authenticate