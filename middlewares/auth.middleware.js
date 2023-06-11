const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        try{
            const decoded=jwt.verify(token,process.env.secret)
            if(decoded){
               
                req.body.userID=decoded.userID
                req.body.user=decoded.user
                next()
            }else{
                res.json({message:"invalid token"})
            }
        }catch(err){
            res.json({message:err.message})
        }
    }else{
        res.json({message:"please login"})
    }
}

module.exports={
    auth
}