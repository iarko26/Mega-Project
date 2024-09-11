const mongoose=require('mongoose');
require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.Mongodb_Url ,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log('Database connected');
    })
    .catch((error)=>{
        console.log('Error connecting to database');
        console.log(error.message);
        process.exit(1);
    })
}