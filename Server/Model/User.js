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
    active:{
           type: Boolean,
			default: true,
    },
    approved:{
        type:Boolean,
        default:false
    },
    additionalInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
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
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
    Courseprogress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }]



},
{ timestamps: true }
)
module.exports=mongoose.model('User',UserSchema);