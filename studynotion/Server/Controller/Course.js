const Course=require('../Model/Course');
const Category=require('../Model/Category');
const User=require('../Model/User');
const {uploadimg}=require('../Utils/imageUploader');
const sectoduration = require('../Utils/secToDuration');
const CourseProgress = require('../Model/CourseProgress');
const Section = require('../Model/Section');
const Subsection = require('../Model/Subsection');

require('dotenv').config();
exports.createCourse=async(req,res)=>{
    try{
        const userid=req.existingUser.id;
        //data fetch
        let{courseName,courseDescription,whatwillyoulearn,price,category,tags,Status,instructions}=req.body;
        //file fetch
        let thumbnail=req.files.thumbnailImg;
        //validation
        if(!courseName || !courseDescription || !whatwillyoulearn || !price || !tags || !thumbnail || !category || !instructions){
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
            thumbnail:thumbnailImg.secure_url,
            Status:Status,
            instructions:instructions

        })
        //add course entry in user(instructor)database
        await User.findByIdAndUpdate(
            instructordetails._id,{
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
        )
        //add course entry in tag database
        await Category.findByIdAndUpdate(
        category
        ,{
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
exports.editcourse=async(req,res)=>{
    try{

        //get courseid
        const {courseId}=req.body;
        const updates=req.body;
        //find course
        const course=await Course.findById(courseId);
        //validation
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        //if there is thumbnail image, upload it
        if(req.files){
            console.log("Thumbnail Image Found")
            const thumbnail=req.files.thumbnailImg;
            const thumbnailImg=await uploadimg(thumbnail,process.env.FOLDER_NAME);
            course.thumbnail=thumbnailImg.secure_url;
        }
        //update only the fields that are present in the request
        for (const key in updates){
            if(updates.hasOwnProperty(key)){
               if(key==="tags" || key==="instructions"){
                course[key] = JSON.parse(updates[key])
               }
               else{
                course[key]=updates[key];
               }

            }
        }
        await course.save();
        const updatedCourse=await Course.findOne({_id:courseId})
                                                  .populate({path:"instructor",
                                                    populate:{
                                                        path:"additionalInfo",
                                                    }
                                                  })
                                                  .populate("category")
                                                  .populate("ratingandreviews")
                                                  .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"Subsection"
                                                    }
                                                  })
                                                  .exec();

             return res.status(200).json({
                success:true,
                message:"Course updated successfully",
                data:updatedCourse
             })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Course cannot be updated"
        })
    }
}
//get all courses
exports.getAllCourses=async(req,res)=>{
    try{
        const fetchallcourses=await Course.find({Status:"Published"},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
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
                select:"-vidoeurl"
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
        let totalDurationInSeconds=0;
        courseDetails.courseContent.forEach((content)=>{
            content.Subsection.forEach((subsection)=>{
                const timeDurationInSeconds=parseInt(subsection.timeDuration);
                timeDurationInSeconds+=timeDurationInSeconds;

            })

        })
        const totalDuration=sectoduration(totalDurationInSeconds);
        //return response
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:{
                courseDetails,
                totalDuration
            }
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
//get full course details
exports.getFullCourseDetails=async(req,res)=>{
    try{
        const {courseId}=req.body;
        const UserId=req.existingUser.id;
        const courseDetails=await Course.findOne({
            _id:courseId
        })
        .populate({
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

        let courseProgressCount=await CourseProgress.findOne({
            courseId:courseId,
            userId: UserId,
        })
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Course details not found"
            })
        }
        let totalDurationInSeconds=0;
        courseDetails.courseContent.forEach((content)=>{
            content.Subsection.forEach((subsection)=>{
                const timeDurationInSeconds=parseInt(subsection.timeDuration);
                timeDurationInSeconds+=timeDurationInSeconds;

            })

        })
        const totalDuration=sectoduration(totalDurationInSeconds);
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:{
                courseDetails,
                totalDuration,
                completedVideos:courseProgressCount?.completeVidoes
                ? courseProgressCount?.completeVidoes
                : ["none"],
            }
        })

    }
    catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
}
}

exports.deleteCourse=async(req,res)=>{
    try{
        const {courseId}=req.body;
        //find course
        const course=await Course.findById(courseId);
        //validation
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        //unenroll all students
        const studentEnrolled=course.studentEnrolled
        for(const studentId of studentEnrolled){
            await User.findByIdAndUpdate(
                studentId,{
                    $pull:{
                        courses:courseId
                    }
                }
            )
        }
        //delete sections and subsections
        const courseSections=course.courseContent;
        for (const sectionId of courseSections){
           const section= await Section.findById(sectionId);
           if(section){
            const subSections=section.Subsection;
            for(const subsectionId of subSections){
                await Subsection.findByIdAndDelete(subsectionId);
            }
           
           }
           await Section.findByIdAndDelete(sectionId);
        }
        //delete course
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })

    }
    catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
    }
}

exports.getInstructorCourses=async(req,res)=>{
    try{
        const InstructorId=req.existingUser.id;
        const instructorCourses=await Course.find({
            "instructor":InstructorId
        }).sort({createdAt:-1})
        return res.status(200).json({
            success:true,
            message:"Instructor courses fetched successfully",
            data:instructorCourses
        })

    }
    catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to retrieve instructor courses",
          error: error.message,
        })
      }
}

exports.markedAsCompleted=async(req,res)=>{
    try{
     const {courseId,userId,subsectionId}=req.body;
     if(!courseId || !userId || !subsectionId){
       return res.status(400).json({
         success:false,
         message:"All fields are required"
       })
     }
      const progressExists=await CourseProgress.findOne({
        userId:userId,
        courseId:courseId
      })
      const completeVidoes=progressExists.completeVidoes;
      if(!completeVidoes.includes(subsectionId)){
        await CourseProgress.findOneAndUpdate({
          courseId:courseId,
          userId:userId
        },{
          $push:{
            completeVidoes:subsectionId
          }
        },{
          new:true
        })
      }
      else{
        return res.status(400).json({
          success: false,
          message: "Lecture already marked as complete",
          })
  
      }
      await CourseProgress.findOneAndUpdate({
          courseId:courseId,
          userId:userId
        },{
          completeVidoes:completeVidoes
        },{
          new:true
        })
     
    }
    catch(error){
      console.error(error);
      return res.status(500).json({
        success:false,
        message:"Cannot mark as completed"
      })
    }
  }