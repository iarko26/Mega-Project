const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true

    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        

    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true


    },
    addditionalInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required:true
        
    },
    courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
    }],
    image:{
        type:String,
        required:true,
    },
    Courseprogress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }]



})
module.exports=mongoose.model('User',UserSchema);