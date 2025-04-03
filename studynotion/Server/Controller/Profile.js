const User=require('../Model/User');
const Profile=require('../Model/Profile');
const Course=require('../Model/Course');
const {uploadimg}=require('../Utils/imageUploader');
const CourseProgress=require('../Model/CourseProgress');
const SecToDuration=require('../Utils/secToDuration');
require('dotenv').config();
exports.updateProfile=async(req,res)=>{
    try{
            //data fetch and user id
            const {dob='',about='',contactNumber="",gender="",  firstname = "",
                lastname = ""}=req.body;
            const UserId=req.existingUser.id;
            
            //find user and profile
            const userdetails=await User.findById(UserId);
            const ProfileDetails=await Profile.findById(userdetails.additionalInfo);
            const user=await User.findByIdAndUpdate(UserId,{
                firstname,
                lastname
            })
            await user.save();
            //update profile
            ProfileDetails.dob=dob;
            ProfileDetails.about=about;
            ProfileDetails.contactNumber=contactNumber;
            ProfileDetails.gender=gender;
            //save database
            await ProfileDetails.save();
            const updatedUserDetails=await User.findById(UserId).populate('additionalInfo').exec();
            //return response
            return res.status(200).json({
                success:true,
                message:"Profile updated successfully",
                updatedUserDetails
            })
            
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Profile cannot be updated"
        })
    }
}
//delete profile or account
exports.deleteprofile=async(req,res)=>{
    try{
        //job schedule to delete user and profile

        //data fetch
        const UserId=req.existingUser.id;
        const user=await User.findById(UserId);
        //validation
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        //delete associate profile with user
        await Profile.findByIdAndDelete({
            _id:user.additionalInfo
        });
        //uneroll user from enrolled courses(fixing)
        const courses=await Course.find({
            studentEnrolled:UserId
         });
         for(let course of courses){
            await Course.findByIdAndUpdate(course.id,{
                $pull:{
                    studentEnrolled:UserId
                }
            }),
            {new:true}
        
         }
        //delete user
        await User.findByIdAndDelete({
            _id:UserId
        });
        
        //return response
        return res.status(200).json({
            success:true,
            message: "Profile and user deleted successfully, and unenrolled from all courses",
        })
            


    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Profile cannot be deleted"
        })
    }
}
exports.getalldetails=async(req,res)=>{
    try{
        const UserId=req.existingUser.id;
        const userdetails=await User.findById(UserId).populate('additionalInfo').exec();
        console.log(userdetails);
        return res.status(200).json({
            success:true,
            message:"Details fetched successfully",
            data:userdetails
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Details cannot be fetched"
        })
    }
}

//updateprofileimage
exports.updateDisplyaPicture=async(req,res)=>{
    try{
        //get image
        const displayPicture=req.files.displayPicture;
        //get user id
        const UserId=req.existingUser.id;
        //upload 
        const image=await uploadimg(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        //update profile
        const updatedProfile=await User.findByIdAndUpdate({
            _id:UserId
        },
    {
        image:image.secure_url
    },{
        new:true
    })
    //return response
    res.status(200).json({
        success:true,
        message:"Image updated successfully",
        data:updatedProfile
    })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Image cannot be updated"
        })
    }
}
//get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {
        // Get user ID
        const UserId = req.existingUser.id;

        // Get user details
        let userDetails = await User.findOne({
            _id: UserId,
        })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "Subsection",
                    },
                },
            })
            .exec();

        // Convert to plain JavaScript object
        userDetails = userDetails.toObject();

        let SubsectionLength = 0;
        for (let i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;
            for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].Subsection.reduce(
                    (acc, curr) => acc + parseInt(curr.timeDuration),
                    0
                );
                userDetails.courses[i].totalDuration = SecToDuration(totalDurationInSeconds);
                SubsectionLength += userDetails.courses[i].courseContent[j].Subsection.length;
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: UserId,
            });
            courseProgressCount = courseProgressCount?.completeVidoes.length || 0;
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100;
            } else {
                // To make it up to 2 decimal points
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage =
                    Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier;
            }
        }

        // Validate
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "Courses not found",
            });
        }

        // Return response
        res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: userDetails.courses,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Courses cannot be fetched",
        });
    }
};
exports.instructorDashboard=async(req,res)=>{
    try{
        const courseData=await Course.find({"instructor":req.existingUser.id});
        const courseDetails=courseData.map((course)=>{
            const totalStudentsEnrolled=course.studentEnrolled.length;
            const totalAmountGenerated=totalStudentsEnrolled*course.price;
            const courseDataWithStats={
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats;
        })
        return res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            data:courseDetails
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

