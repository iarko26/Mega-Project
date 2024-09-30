const Section=require('../Model/Section');
const Course=require('../Model/Course');

exports.createSection=async(req,res)=>{
    try{
        //data fetch
        const {sectionName,courseId}=req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //create Section
        const newSection=await Section.create({
            sectionName:sectionName
        })
        //update course with section id and use populate to replace section and subsection both in updatedCourseDetails
       const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},
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
        const {sectionName,sectionId}=req.body;
        //validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //update
        const updatedsection=await Section.findByIdAndUpdate({
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
        const {sectionId}=req.params;
        //delete
        const deletedSection=await Section.findByIdAndDelete(
            {
                _id:sectionId
            })
        //tesing:do we need to delete section from courseContent array of course

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