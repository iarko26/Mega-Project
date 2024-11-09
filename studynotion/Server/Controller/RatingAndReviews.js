const { default: mongoose } = require('mongoose');
const Course=require('../Model/Course');
const RatingAndReview=require('../Model/RatingAndReview');
const { defaultConfiguration } = require('express/lib/application');

//createraing
exports.createRating=async(req,res)=>{
    try{
        //get user id
        let userId=req.req.existingUser.id;
        //fetch data from req body
        let {rating,review,courseId}=req.body;
        //check if user is enrolled or not
        let courseDetails=await Course.findOne({
            _id:courseId
        },{
            studentEnrolled:{$elemMatch:{$eq:userId}}
        },{

        })
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }
        //check if user already reviewed the course
        let alreadyReviewed=await RatingAndReview.findOne({
            user:userId,
            course:courseId 
            

        })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            })
        }
        //create rating and review
        let ratingReview=await RatingAndReview.create({
            rating,review,
            user:userId,
            course:courseId
        })

        //update course with this rating/review
        let updatedCourseDetails=await Course.findByIdAndUpdate({
            _id:courseId},{
                $push:{
                    ratingandreviews:ratingReview._id
                }
            },{
                new:true
            }
        )
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully",
            data:ratingReview
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Rating and Review cannot be created"
        })
    }
}
//getveiwrating
exports.getAverageRating=async(req,res)=>{
    try{
        //get course id
        let {courseId}=req.body;
        //calculate average rating
        let result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:mongoose.Types.ObjectId(courseId),
                }

            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:'$rating'},
                    
                }
            }

        ]);


        //return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                message:"Average rating fetched successfully",
                averageRating:result[0].averageRating
            })
        }
        //check there is rating or not
        return res.status(200).json({
            success:true,
            message:"Average rating is 0, no ratings given till now",
            averageRating:0
        })


    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Average rating cannot be fetched"
    })

}
}
//getallrating
exports.getAllRating=async(req,res)=>{
   try{
        let allReviews=await RatingAndReview.find({})
                                              .sort({rating:"desc"})
                                               .populate({
                                                path:"user",
                                                select:"firstname lastname email image"
                                               })
                                               .populate({
                                                path:"course",
                                                select:"courseName"
                                               })
                                               .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews
        })

   }
   catch(error){
    console.error(error);
    return res.status(500).json({
        success:false,
        message:"Rating and Review cannot be fetched"
    })
   }

}
