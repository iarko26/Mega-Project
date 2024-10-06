const Course=require('../Model/Course');
const Category=require('../Model/Category');
const User=require('../Model/User');
const {uploadimg}=require('../Utils/imageUploader');
require('dotenv').config();
exports.createCourse=async(req,res)=>{
    try{
        const userid=req.existingUser.id;
        //data fetch
        const{courseName,courseDescription,whatwillyoulearn,price,category,tags}=req.body;
        //file fetch
        const thumbnail=req.files.thumbnailImg;
        //validation
        if(!courseName || !courseDescription || !whatwillyoulearn || !price || !tags || !thumbnail || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        if(!Status || Status===undefined){
            Status="Draft";
        }
        //check instructor
        const instructordetails=await User.findById(userid,{
            accountType:"Instructor"
        })
        if(!instructordetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }
        const catergoryDetails=await Category.findById(category);
        if(!catergoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
        
        //Image Upload to cloudinary
        const thumbnailImg=await uploadimg(thumbnail,process.env.FOLDER_NAME);
        console.log(thumbnailImg);
        //create new course in database
        const newCourse=await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            whatwillyoulearn:whatwillyoulearn,
            price:price,
            category:catergoryDetails._id,
            instructor:instructordetails._id,
            tags:tags,
            thumbnail:thumbnailImg.secure_url

        })
        //add course entry in user(instructor)database
        await User.findByIdAndUpdate(
            {id:instructordetails._id},{
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
        )
        //add course entry in tag database
        await Category.findByIdAndUpdate({
            _id:category
        },{
            $push:{
                courses:newCourse._id
            }
        },
        {new:true}
        )
    
        
        //return response
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Course cannot be created"
        })

    }
}
//get all courses
exports.getAllCourses=async(req,res)=>{
    try{
        const fetchallcourses=await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            ratingandreviews:true,
            studentEnrolled:true
           
        })
        .populate('instructor')
        .exec();

        return res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            data:fetchallcourses
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Courses cannot be fetched"
        })
    }
}

//getCourseDetails
exports.getcourseDetails=async(req,res)=>{
    try{
        //get course id
        const {courseId}=req.body
        //get course details
        const courseDetails=await Course.find(
            {_id:courseId}
        ).populate({
            path:"instructor",
            populate:{
                path:"additionalInfo",
            }
        })
        .populate('category')
        .populate({
            path:'courseContent',
            populate:{
                path:'Subsection',
            }
        })
        .populate('ratingandreviews')
        .exec();

        //validation
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course details not found"
            })
        }
        //return response
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:courseDetails
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Course details cannot be fetched"
        })
    }
}