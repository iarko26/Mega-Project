const User=require('../Model/User');
const mailSender=require('../Utils/Mailsender');
const crypto=require('crypto');
const bcrypt=require('bcrypt');
//resetpasstoken
exports.resetPasswordtoken=async(req,res)=>{
    try{
        //fetch email from request body
        const {email}=req.body;
        //check email exists,email validation
        const existingUser=await User.findOne({
            email:email
        })
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
        //generate token
        const token=crypto.randomUUID();
        //update user by adding token and expiry date
        const updatedDetails=await User.findOneAndUpdate({email:email},{
            token:token,
            resetPasswordExpires:Date.now()+5*60*1000
        },
        {
            new:true
        })

        //create url
        const url=`http://localhost:3000/resetpassword/${token}`;

        //send mail containing url
        await mailSender(email,"Reset Password",`<a href=${url}>Click here to reset password</a>`)

        //return response
        return res.status(200).json({
            success:true,
            message:"Reset password link has been sent to your email"
        })
        



    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Reset password link cannot be sent"
        })

    }
}
//resetpassword
exports.resetPassword=async(req,res)=>{
    try{
        //data fetch
    const {password,confirmpassword,token}=req.body;
    //validate
    if(password !==confirmpassword){
        return res.status(401).json({
            success:false,
            message:"Password do not match"
        })
    }
    //get userdetails by token
    const userdetails=await User.findOne({token:token});
    //check valid token
    if(!userdetails){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        })

    }
    //check expiry date
    if(userdetails.resetPasswordExpires>Date.now()){
        return res.status(401).json({
            success:false,
            message:"Token expired"
        })
    }
    //update password
    const hashedupdatepassword=await bcrypt.hash(password,10);
    await User.findOneAndUpdate(
        {token:token},
        {
            password:hashedupdatepassword,

        },
        {new:true })
    //return response
    return res.status(200).json({
        success:true,
        message:"Password reset successfully"
    })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Password cannot be reset"
        })
    }
}