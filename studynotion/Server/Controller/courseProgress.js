const mongoose = require('mongoose');

const Subsection=require('../Model/Subsection');
const CourseProgress=require('../Model/CourseProgress');

exports.updateCourseProgress=async(req,res)=>{
    const {courseId,subsectionId}=req.body;
    const userId=req.exisitingUser.id;
    try{
        const subsection=await Subsection.findById(subsectionId);
        if(!subsection){
            return res.status(404).json({
                error:"Invalid subsection"
            })
        }
        let courseProgress=await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        })
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course progress Does Not Exist"
            })
        }
        else{
            if(courseProgress.completeVidoes.includes(subsectionId)){
                return res.status(400).json({
                    error:"Subsection already completed"
                })
            }
            courseProgress.completeVidoes.push(subsectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            message:"Course progress updated"
        })
        

    }catch (error) {
    console.error(error)
    return res.status(500).json({
        error: "Internal server error",


    })
  }
}