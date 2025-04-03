const { default: mongoose } = require('mongoose');
const {instance}=require('../Config/razorpay');
const Course=require('../Model/Course');
const User=require('../Model/User');
const mailSender=require('../Utils/Mailsender');
const courseEnrollmentEmail=require('../mail/template/courseEnrollmentEmail');
const paymentSuccessEmail=require('../mail/template/paymentSuccessEmail');
const CourseProgress=require('../Model/CourseProgress');

//capture the payment and initiate the razorpay payment
exports.capturePayment=async(req,res)=>{
  
const {courses}=req.body;
const userId=req.existingUser.id;
if(courses.length===0){
    return res.json({
        success:false,
        message:"Please Provide Course ID"
    })
}
let total_amount=0;
for(const course_id of courses){
    let course;
    try{
  course=await Course.findById(course_id);
  if(!course){
    return res
    .status(200)
    .json({ success: false, message: "Could not find the Course" })
  }
  const uid=new mongoose.Types.ObjectId(userId);
  if(course.studentEnrolled.includes(uid)){
    return res
              .status(200)
              .json({ success: false, message: "Student is already Enrolled" })
  }
    total_amount+=course.price;
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
    const options={
        amount:total_amount*100,
        currency:"USD",
        receipt:Math.random(Date.now()).toString(),
    }
    try{
     const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse);
         res.json({
              success: true,
              data: paymentResponse,
            })
    }
    catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ success: false, message: "Could not initiate order." })
      }

}


}
//verify the razorpay signature and server
exports.verifysignature=async(req,res)=>{
   const razorpay_order_id=req.body?.razorpay_order_id;
   const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body?.courses;
    const userId=req.existingUser.id;
    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
      ) {
        return res.status(200).json({ success: false, message: "Payment Failed" })
      }

      let body=razorpay_order_id + "|" +razorpay_payment_id;  

      const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString()).digest("hex");
      if(expectedSignature===razorpay_signature){
        await enrollStudents(courses,userId,res)
        return res.status(200).json({ success: true, message: "Payment Verified" })
      }
      return res.status(200).json({ success: false, message: "Payment Failed" })

      

}

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.existingUser.id;

  // Validate input
  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    // Fetch the user details
    const StudentEnrolled = await User.findById(userId);

    if (!StudentEnrolled) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Send the email
    await mailSender(
      StudentEnrolled.email, // Email address
      "Payment Received", // Subject
      paymentSuccessEmail(
        `${StudentEnrolled.firstname} ${StudentEnrolled.lastname}`, // Full name
        amount / 100, // Amount in proper format
        orderId, // Order ID
        paymentId // Payment ID
      )
    );

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Payment success email sent successfully",
    });
  } catch (error) {
    console.error("Error in sending payment success email:", error);
    return res
      .status(500)
      .json({ success: false, message: "Could not send email" });
  }
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completeVidoes: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstname} ${enrolledStudent.lastname}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}


 

  

  


