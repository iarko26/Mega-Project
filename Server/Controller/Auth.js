//signup
//login
//send otp
//change password
const express = require('express');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../Model/User');
const OTP=require('../Model/OTP');
const otpGenerator=require('otp-generation');
const crypto=require('crypto');
const Profile = require('../Model/Profile');
require('dotenv').config();
exports.sendOTP=async(req,res)=>{
   try{
    const{email}=req.body;
    const checkUser=await User.findOne({email:email});
    if(checkUser){
        return res.status(401).json({
            success:false,
            message:"User already exists",

        })
    }
     const otp=crypto.randomInt(1000,9999).toString();
     const newOTP=new OTP({
        email:email,
        otp:otp
     })
     
     await newOTP.save();
     
     res.status(200).json({
        success:true,
        message:"OTP sent successfully"
     })
}catch(error){
    console.error(error);
    return res.status(500).json({
        success:false,
        message:"OTP cannot be sent"
    })


   }
}

exports.signUp=async(req,res)=>{
    try{
        //data fetch
        const{firstname,lastname,email,password,confirmpassword,accountType,otp,contactNumber}=req.body;
        //validate
        if(!firstname || !lastname || !email || !password || !confirmpassword || !accountType || !otp || !contactNumber ){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //check password match
        if(password!==confirmpassword){
            return res.status(400).json({
                success:false,
                message:"Password do not match"
            })
        }
        //check user exists

        const existingUser=await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        //find most recent otp stored in db

        const recentOTP=await OTP.findOne({email:email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);
         //validate otp
         if(recentOTP.length===0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
         }
         else if(recentOTP.otp!==otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
         }

//hash password
const hashedpassword=await bcrypt.hash(password,10);
//create a profile
const ProfileDetails=await Profile.create({
    gender:null,
    dob:null,
    about:null,
    ContactNo:null
})
//create a user for the db
const newUser=await User.create({
    firstname:firstname,
    lastname:lastname,
    email:email,
    password:hashedpassword,
    accountType:accountType,
    contactNumber:contactNumber,
    additionalInfo:ProfileDetails._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`



})
//return response
return res.status(200).json({
    success:true,
    message:"User registered successfully",
    newUser:newUser
})



    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered"
        })
    }
}
exports.login=async(req,res)=>{
    try{
        //data fetch
        const{email,password}=req.body;

        //validate data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //check user registered
        const existingUser=await User.findOne({email:email}).populate('additionalInfo');
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User is not registered! Please register"
            })
        }
        const payload={
            email:existingUser.email,
            id:existingUser._id,
            accountType:existingUser.accountType
            

        }
        if(await bcrypt.compare(password,existingUser.password)){
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h'
            })
            const user=existingUser.toObject();
            user.token=token;
            user.password=undefined;
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000);
                httpOnly:true
            }

            res.cookie('token',token,options).status(200).json({
                success:true,
                message:"User logged in successfully",
                user:user,
                token:token
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            })
        }

       
        //generate token
        //password match
        //create cookie
        //return response

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be logged in"
        })
    }
}
exports.changePassword=async(req,res)=>{
    try{
        //get data
        const{email,oldpassword,newpassword,confirmpassword}=req.body;
        //old password,new password,confirm password
        //validate data
        if(!email || !oldpassword || !newpassword || !confirmpassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const existingUser=await User.findOne({email:email});
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            })
        }
        //check old password
        const isMatch=await bcrypt.compare(oldpassword,existingUser.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            })
        }
        //check new password
        if(newpassword!==confirmpassword){
            return res.status(400).json({
                success:false,
                message:"Password do not match"
            })
        }

        //password update in db
        const hashednewpassword=await bcrypt.hash(newpassword,10);
        existingUser.password=hashednewpassword;
        await existingUser.save();
      //send mail- password changed

       

        //return response
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
          });

        
       

    }catch(error){
        console.error(error);
        return res.status(500).json({

        })
    }
}


