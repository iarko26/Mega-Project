const mongoose=require('mongoose');
const Subsection = require('./Subsection');
const SectionSchema=new mongoose.Schema({
    sectionName:{
        type:String

    },
    Subsection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subsection",
        required:true
    }]

})
module.exports=mongoose.model("Section",SectionSchema);