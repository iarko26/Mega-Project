const Section=require('../Model/Section');
const Subsection=require('../Model/Subsection');
const {uploadimg}=require('../Utils/imageUploader');
require('dotenv').config();
exports.createSubSection = async (req, res) => {
    try {
        // data necessary fetch
        let { sectionId, title, description } = req.body;
        // file fetch - Fix the field name from 'vidoe' to 'video'
        let video = req.files.video;
        
        // validation
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        // upload video to cloudinary
        let uploadvideofile = await uploadimg(video, process.env.FOLDER_NAME);
        
        // create a subsection - Fix the field name from 'vidoeurl' to 'videoUrl'
        let subsectiondetails = await Subsection.create({
            title: title,
            timeDuration: `${uploadvideofile.duration}`,
            description: description,
            videoUrl: uploadvideofile.secure_url
        });
        
        // update section with subsection id and log updated section here after adding subsection query
        let updatedsectiondetails = await Section.findByIdAndUpdate({
            _id: sectionId
        }, {
            $push: {
                Subsection: subsectiondetails._id
            }
        }, {
            new: true
        }).populate('Subsection').exec();
        console.log(updatedsectiondetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            data: updatedsectiondetails // Return the updated section
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "SubSection cannot be created"
        });
    }
};
//update subsection
exports.updateSubSection=async(req,res)=>{
    try{
       const {sectionId,subsectionId,title,
        description
       }=req.body;
       const subSection=await Subsection.findById(subsectionId);
       if(!subSection){
        return res.status(404).json({
            success:false,
            message:"SubSection not found",
        })
       }
       if(title!==undefined){
           subSection.title=title;
       }
         if(description!==undefined){
              subSection.description=description;
         }
         if(req.files && req.files.vidoe!==undefined){
            const vidoe=req.files.vidoe;
            const uploadDetails=await uploadimg(vidoe,process.env.FOLDER_NAME);
            subSection.vidoeurl=uploadDetails.secure_url;
            subSection.timeDuration=`${uploadDetails.duration}`;


         }
         await subSection.save();
         const updatedSection=await Section.findById(sectionId).populate('Subsection');
         return res.json({
                success:true,
                message:"SubSection updated successfully",
                data:updatedSection
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
        const{subsectionId,sectionId}=req.body;
        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull:{
                    Subsection:subsectionId
                }
            }
        )

        const subsection=await Subsection.findByIdAndDelete({_id:subsectionId})
        if(!subsection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found"
            })
        }
        const updatedSection=await Section.findById(sectionId).populate("Subsection");
        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
            data:updatedSection
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"SubSection cannot be deleted"
        })
    }
}