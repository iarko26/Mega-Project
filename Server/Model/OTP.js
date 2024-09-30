const mongoose=require('mongoose');
const mailSender = require('../Utils/Mailsender');
const {otpTemplate}=require('../mail/template/mailverificationTemplate');
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
        expires:60*5,

    }
})
async function mailverificationsender(email,otp){
    try{
        const mailresponse=await mailSender(
            email,
            "Verification Email",
            otpTemplate(otp)
        );
        console.log("Email sent successfully: ", mailresponse.response);
    }catch(error){

        throw new Error("Error occured while sending mail",error);
        
        
    }
}
// Define a post-save hook to send email after the document has been saved
OTPSchema.pre('save',async function(next){
    console.log("New document saved to database");
    if(this.isNew){
        await mailverificationsender(this.email,this.otp);

    }
    next();
    
})



module.exports=mongoose.model('OTP',OTPSchema);