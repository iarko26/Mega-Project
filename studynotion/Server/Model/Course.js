const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
       
    },
    courseDescription:{
        type:String,
        
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatwillyoulearn:{
        type:String,

    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
        
    }],
    ratingandreviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    price:{
        type:Number,
        
    },
    thumbnail:{
        type:String,
        
    },
    tags:{
        type:[String],
        required:true
        
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    }],
    instructions:{
        type:[String],
        
    },
    Status:{
        type:String,
        enum:["Draft","Published"]
    }
})
module.exports=mongoose.model('Course',courseSchema);
