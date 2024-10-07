const Section=require('../Model/Section');
const Course=require('../Model/Course');

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
            data:updatedCourseDetails
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
        let {sectionName,sectionId}=req.body;
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
        //return response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:updatedsection
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
        //data fetch
        let {sectionId}=req.body;
        //delete
        let deletedSection=await Section.findByIdAndDelete(sectionId);
        //validation
        if(!deletedSection){
            return res.status(404).json({
                success:false,
                message:"Section not found"
            })
        }
           
        //after delete section remove section from course
        await Course.findByIdAndUpdate(deletedSection.courseId,{
            $pull:{
                courseContent:sectionId
            }
        },{new:true})
        




        //return response
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            data:deletedSection 
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