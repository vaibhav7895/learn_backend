const express=require("express")
const {userModel}=require("../models/user.model")
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config()
userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.json({message:err.message})
            }else{
                const user= new userModel({name,email,pass:hash})
                await user.save()
                res.json({message:"user registered",user:req.body})
            }
        })
       
    }catch(err){
        res.json({message:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
     const user = await userModel.findOne({email})
     if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
         if(result){
            let token =jwt.sign({userID:user._id,user:user.name},process.env.secret)
            res.json({message:"login success",token})
         }else{
            res.json({message:"wrong credentials"})
         }
        })
     }
    }catch(err){
        res.json({message:err.message})
    }

})


module.exports={
    userRouter
}