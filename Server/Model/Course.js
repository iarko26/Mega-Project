const mongoose=require('mongoose');
const User = require('./User');
const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    whatwillyoulearn:{
        type:String,
        required:true,
        trim:true
    },
    courseContenet:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
        required:true
    }],
    ratingandreviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    tags:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
        required:true
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true

    }]









    

})
module.exports=mongoose.model('Course',courseSchema);
