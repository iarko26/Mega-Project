const mongoose = require('mongoose');
const ProfileSchema=new mongoose.Schema({
    gender:{
        type:String,
        required:true,
        enum:[male,female]
    },
    dob:{
        type:Date,
        required:true
    },
    about:{
        type:String,
        required:true,
        trim:true
    },
    ContactNo:{
        type:Number,
        required:true,
        trim:true
    }


})
module.exports=mongoose.model('Profile',ProfileSchema);