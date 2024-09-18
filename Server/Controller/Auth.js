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
        message:error.message
    })


   }
}

exports.signUp=async(req,res)=>{
    try{
        

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



