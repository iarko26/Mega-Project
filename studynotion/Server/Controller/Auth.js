//signup
//login
//send otp
//change password

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../Model/User');
const OTP=require('../Model/OTP');
const otpGenerator=require('otp-generator');
// const crypto=require('crypto');
const {passwordUpdate}=require('../mail/template/passwordUpdate');
const Profile = require('../Model/Profile');
const mailSender = require('../Utils/Mailsender');
require('dotenv').config();
exports.signUp = async (req, res) => {
    try {
        const { 
            firstname, 
            lastname, 
            email, 
            password, 
            confirmpassword, 
            accountType, 
            otp 
        } = req.body;

        // Validation
        if (!firstname || !lastname || !email || !password || !confirmpassword || !accountType || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check password match
        if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // Check user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Verify OTP
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOTP.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        } else if (otp !== recentOTP[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Hash password
        const hashedpassword = await bcrypt.hash(password, 10);

        // Determine approval status
        let approved = accountType === "Instructor" ? false : true;

        // Create profile
        const ProfileDetails = await Profile.create({
            gender: null,
            dob: null,
            about: "",
            contactNumber: null
        });

        // Create user
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedpassword,
            accountType,
            approved,
            additionalInfo: ProfileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname}+${lastname}`
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: user
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            success: false,
            message: "User registration failed",
            error: error.message
        });
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
      
        if(await bcrypt.compare(password,existingUser.password)){
            const token=jwt.sign(
              {
                email:existingUser.email,
            id:existingUser._id,
            accountType:existingUser.accountType
              },
              process.env.JWT_SECRET,{
                    expiresIn: "24h",
              }
                )
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
                user,
               token
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
     var otp=otpGenerator.generate(6,{
        upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
     })
    
    
    const result=await OTP.findOne({otp:otp});
    console.log(result);
    console.log("OTP",otp);
    while(result){
        otp=otpGenerator.generate(6,{
            upperCaseAlphabets: false,
        })
    }
    const otppayload={email,otp};
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
const {oldPassword,newPassword}=req.body;
//validate old password
const isPasswordValid=await bcrypt.compare(
    oldPassword,
    userdetails.password
)
if(!isPasswordValid){
    return res.status(400).  json({ success: false, message: "The password is incorrect" })
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


