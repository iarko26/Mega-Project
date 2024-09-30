const { default: mongoose } = require('mongoose');
const {instance}=require('../Config/razorpay');
const Course=require('../Model/Course');
const User=require('../Model/User');
const mailSender=require('../Utils/Mailsender');
const courseEnrollmentEmail=require('../mail/template/courseEnrollmentEmail');
const { default: orders } = require('razorpay/dist/types/orders');

//capture the payment and initiate the razorpay payment
exports.capturePayment=async(req,res)=>{
  
    try{
          //get course id and user id
      const {courseId}=req.body;
      const userid=req.existingUser.id;
         //valid course id
      //valid coursedetails
     if(!courseId){
      return res.status(400).json({
          success:false,
          message:"Course id is required"
      })
     }
     
    const courseDetails=await Course.findById(courseId);
    if(!courseDetails){
        return res.status(404).json({
            success:false,
            message:"Course not found"
        })
    }
   
      //check user pay for the same course
      const uid=new mongoose.Types.ObjectId(userid);
      if(courseDetails.studentEnrolled.includes(uid)){
        return res.status(400).json({
            success:false,
            message:"You have already enrolled in this course"
        })
      }

      //create order
      let amount=courseDetails.price;
      let currency='USD';
      const options={
        //amount in smallest currency unit
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            desc:"Course Purchase",
            courseId:courseId,
            userId:userid
        }

      }
    
        const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            message:"Payment initiated successfully",
            courseName:courseDetails.courseName,
            courseDescription:courseDetails.courseDescription,
            thumbnail:courseDetails.thumbnail,
            orderId:paymentResponse.id,
            amount:paymentResponse.amount,
            currency:paymentResponse.currency
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Payment cannot be initiated"
        })
    }


}
//verify the razorpay signature and server
exports.verifysignature=async(req,res)=>{
    const webhooksecret='12345678';
    const signature=req.headers['x-razorpay-signature'];
    //create hmac object
    const shasum=crypto.createHmac("sha256",webhooksecret);
    //update it with the request body
    shasum.update(JSON.stringify(req.body));
    //get the computed signature
    const digest=shasum.digest('hex');
    if(signature===digest){
        console.log("Request is Authorized");
        const {courseId,userId}=req.body.payload.payment.entity.notes;
        try{
            const enrollcourse=await Course.findByIdAndUpdate({
                _id:courseId
            },{
                $push:{
                    studentEnrolled:userId
                }
            },{
                new:true
            })
            if(!enrollcourse){
                return res.status(404).json({
                    success:false,
                    message:"Course not found"
                })
            }
            console.log(enrollcourse);

            //find the student and add the course to the enrolled courses
            const enrollStudent=await User.findByIdAndUpdate({
                _id:userId
            },{
                $push:{
                    courses:courseId
                }
            },
            {
                new:true
            })
            if(!enrollStudent){
                return res.status(404).json({
                    success:false,
                    message:"User not found"
                })
            }
            console.log(enrollStudent);

            //send confirmation email
            const emailresponse=await mailSender(
                enrollStudent.email,
                "Congratulations! You have successfully enrolled in the course",
                courseEnrollmentEmail(
                    enrollStudent.firstname,
                    enrollcourse.courseName,


                )
            )

        }
        catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:"Payment cannot be verified"
            })
        }
     
    }

}


 

  

  


