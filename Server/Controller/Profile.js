const User=require('../Model/User');
const Profile=require('../Model/Profile');
const Course=require('../Model/Course');
const {uploadimg}=require('../Utils/imageUploader');
require('dotenv').config();
exports.updateProfile=async(req,res)=>{
    try{
            //data fetch and user id
            const {dob='',about='',contactNumber,gender}=req.body;
            const UserId=req.existingUser.id;
            //validation
            if(!contactNumber || !gender || !UserId){
                return res.status(400).json({
                    success:false,
                    message:"All fields are required"
                })
            }
            //find user and profile
            const userdetails=await User.findById(UserId);
            const ProfileDetails=await Profile.findById(userdetails.additionalInfo);
            //update profile
            const updatedProfile=await Profile.findByIdAndUpdate({
                _id:ProfileDetails.id
                
            },{
                dob:dob,
                about:about,
                contactNumber:contactNumber,

            },
            {new:true}
            )
            //save database
            await updatedProfile.save();
            //return response
            return res.status(200).json({
                success:true,
                message:"Profile updated successfully",
                data:updatedProfile
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
