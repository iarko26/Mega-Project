//signup
//login
//send otp
//change password

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../Model/User');
const OTP=require('../Model/OTP');

const crypto=require('crypto');
const {passwordUpdate}=require('../mail/template/passwordUpdate');
const Profile = require('../Model/Profile');
const mailSender = require('../Utils/Mailsender');
require('dotenv').config();
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
         if(!recentOTP){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
         }
         else if(otp!==recentOTP.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
         }
//hash password
const hashedpassword=await bcrypt.hash(password,10);
//create the user 
let approved='';
approved==="Instructor" ? (approved=false) : (approved=true);
//create a profile
const ProfileDetails=await Profile.create({
    gender:null,
    dob:null,
    about:"",
    contactNumber:contactNumber
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
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname}+${lastname}`



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
        const existingUser=await User.findOne({email:email}).populate('additionalInfo').exec();
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
                expiresIn:'24h'
            })
            const user=existingUser.toObject();
            user.token=token;
            user.password=undefined;
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
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
    
    
    const result=await OTP.findOne({otp:otp});
    while(result){
        otp=crypto.randomInt(1000,9999).toString();
        result=await OTP.findOne({otp:otp});
    }

    console.log(result);
    console.log("OTP",otp);
    // while(result){
    //     otp=otpGenerator.generate(6,{upperCaseAlphabets: false
    // });
    // }
    const otppayload={email:email,otp:otp};
    const otpbody=await OTP.create(otppayload);
    console.log(otpbody);
     res.status(200).json({
        success:true,
        message:"OTP sent successfully",
        otp:otp
     })


}
catch(error){
    console.error(error);
    return res.status(500).json({
        success:false,
        message:"OTP cannot be sent"
    })


   }
}




exports.changePassword=async(req,res)=>{
    try{
//get user data
const userdetails=await User.findById(req.existingUser.id);
//get old and new password and confirm password from req body
const {oldPassword,newPassword,confirmPassword}=req.body;
//validate old password
const isPasswordValid=await bcrypt.compare(
    oldPassword,
    userdetails.password
)
if(!isPasswordValid){
    return res.status(400).json({
        success:false,
        message:"Invalid old password"
    })
}
if(newPassword!==confirmPassword){
    return res.status(400).json({
        success:false,
        message:"Password do not match"
    })
}
//update password
const encryptedPassword=await bcrypt.hash(newPassword,10);
const updatedUSerdetails=await User.findByIdAndUpdate(
    req.existingUser.id,
    {
        password:encryptedPassword
    },
    {new:true})
//send notification mail
try{
    const emailresponse=await mailSender(
        updatedUSerdetails.email,
        passwordUpdate(
            updatedUSerdetails.email,
            `Password updated successfully for ${updatedUSerdetails.firstname} ${updatedUSerdetails.lastname}`
        )
        
        
    );
    console.log("Email sent successfully:",emailresponse.response)

}
catch(error){
    console.error("Error occured while sending mail",error);
    return res.status(500).json({
        success:false,
        message:"Error occured while sending mail"
    })
}
return res.status(200).json({
    success:true,
    message:"Password updated successfully"
})

    }catch(error){
        console.error("Error occured while updating password",error);
        return res.status(500).json({
            success:false,
            message:"Error occured while updating password"
        })
    }
}


