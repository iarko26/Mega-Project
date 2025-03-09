const Section=require('../Model/Section');
const Course=require('../Model/Course');
const SubSection=require('../Model/Subsection')
exports.createSection=async(req,res)=>{
    try{
        //data fetch
        let {sectionName,courseId}=req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //create Section
        let newSection=await Section.create({
            sectionName:sectionName
        })
        //update course with section id and use populate to replace section and subsection both in updatedCourseDetails
       let updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},
            {$push:{
                courseContent:newSection._id
            }},
            {new:true}
        ).populate({
            path:'courseContent',
            populate:{
                path:'Subsection'
            }
        })
        .exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Section cannot be created"
        })
    }
}
exports.updateSection=async(req,res)=>{
    try{
        //data fetch
        let {sectionName,sectionId,courseId}=req.body;
        //validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //update
        let updatedsection=await Section.findByIdAndUpdate({
            _id:sectionId
        },{
            sectionName:sectionName
        },
        {new:true
        })
        const course=await Course.findById(courseId)
        .populate({
            path:'courseContent',
            populate:{
                path:"Subsection"

            }
        })
        .exec()
        //return response
        return res.status(200).json({
            success:true,
            message:updatedsection,
            data:course
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Section cannot be updated"
        })
    }
}
exports.deleteSection=async(req,res)=>{
     try{
        let {sectionId,courseId}=req.body;
        await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId
            }
        })
        const section=await Section.findById(sectionId);
        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section not found"
            })
        }
        await SubSection.deleteMany({
            _id:{
                $in:section.Subsection
            }
        })
        await Section.findByIdAndDelete(sectionId)
        const course=await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
              path: "Subsection",
            },
          })
          .exec()
          return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: course,
          })
        
       


     }
        catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:"Section cannot be deleted"
            })
        }
}