const mongoose=require('mongoose');
const CourseProgressSchema= new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    completeVidoes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subsection",
        required:true
    }


})
module.exports=mongoose.model('CourseProgress',CourseProgressSchema);