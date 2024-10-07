const Section=require('../Model/Section');
const Subsection=require('../Model/Subsection');
const {uploadimg}=require('../Utils/imageUploader');
require('dotenv').config();
exports.createSubSection=async(req,res)=>{
    try{
        //data necessary fetch
        let {sectionId,title,timeDuration,description}=req.body;
        //file fetch
        let vidoe=req.files.vidoe;
        //validation
        if(!sectionId || !title || !timeDuration || !description || !vidoe){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //upload video to cloudinary
        let uploadvideofile=await uploadimg(vidoe,process.env.FOLDER_NAME);
        //create a subsection
        let subsectiondetails=await Subsection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            vidoeurl:uploadvideofile.secure_url
        })
        //update section with subsection id and log updated section here after adding subsection query
        let updatedsectiondetails=await Section.findByIdAndUpdate({
            _id:sectionId
        },{
            $push:{
                Subsection:subsectiondetails._id
            }
        },{
            new:true
        }).populate('Subsection').exec();
        console.log(updatedsectiondetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            data:subsectiondetails
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"SubSection cannot be created"
        })
    }
}
//update subsection
exports.updateSubSection=async(req,res)=>{
    try{
        //data fetch
        let {subsectionId,title,timeDuration,description}=req.body;
        //validation
        if(!subsectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //update
        let updatedsubsection=await Subsection.findByIdAndUpdate(
            {_id:subsectionId},
            {
                title:title,
                timeDuration:timeDuration,
                description:description
            
            },
            {new:true}

        )
        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully",
            data:updatedsubsection
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"SubSection cannot be updated",
            
        })
    }

}
//delete subsection
exports.deleteSubSection=async(req,res)=>{
    try{
        //data fetch
        let {subsectionId}=req.params;
        let deletedsubsection=await Subsection.findByIdAndDelete({
            _id:subsectionId
        })
        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
            data:deletedsubsection
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"SubSection cannot be deleted"
        })
    }
}