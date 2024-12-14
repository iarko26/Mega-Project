const mongoose = require('mongoose');
const ProfileSchema=new mongoose.Schema({
    gender:{
        type:String,
        default: null,
   
    },
    dob:{
        type:String,
        default:null,
        
    },
    about:{
        type:String,
        
    },
    contactNumber:{
        type:Number,
        required:null,
        
    }


})
module.exports=mongoose.model('Profile',ProfileSchema);