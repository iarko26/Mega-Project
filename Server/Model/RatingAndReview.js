const mongoose=require('mongoose');
const RatingandReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    rating:{
        type:Number,
        required:True

    },
    review:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model("RatingAndReview",RatingandReviewSchema)