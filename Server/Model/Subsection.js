const mongoose=require('mongoose');
const SubsectionSchema= new mongoose.Schema({
    title:{
        type:String,
    

    },
    timeDuration:{
        type:String,
    
    },
    description:{
        type:String,
    
    },

    vidoeurl:{
        type:String,
  
    }
    


})
module.exports=mongoose.model('Subsection',SubsectionSchema);