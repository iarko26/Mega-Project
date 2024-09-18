const mongoose=require('mongoose');
const mailSender = require('../Utils/Mailsender');
const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60

    }
})
async function mailverificationsender(email,otp){
    try{
        const mailresponse=await mailSender(email,"OTP for verification from LEMMESTUDY",`<h1>Your OTP for verification is ${otp}</h1>`);
        console.log("Mail sent Successfully:",mailresponse);
    }catch(error){

        throw new Error("Error occured while sending mail",error);
        
        
    }
}
OTPSchema.pre('save',async function(next){
    await mailverificationsender(this.email,this.otp);
    next();
})


module.exports=mongoose.model('OTP',OTPSchema);