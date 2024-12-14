const mailSender = require('../Utils/Mailsender');
const {contactus}=require('../mail/template/contactus');
exports.contactController=async(req,res)=>{
    const {email,
        firstname,
        lastname,
        message,
        phonenumber,
        countrycode
}=req.body;
    try{
        const emailresponse=await mailSender(
            email,
            "Your Data send successfully",
            contactus(
                firstname,
                lastname,
                message,
                phonenumber,
                countrycode
            )

        )
        console.log("Email Response............",emailresponse)
        return res.status(200).json({
            success: true,
      message: "Email send successfully",
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
      message: "Email cannot be sent",
        })
    }

}