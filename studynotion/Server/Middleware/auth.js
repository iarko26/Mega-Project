//auth
//isstudent
//isadmin
//isinstructor

const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();


exports.auth=async(req,res,next)=>{
    try{
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        console.log("Received Token:", token);

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded);
            req.existingUser=decoded;

        }catch(error){
            console.error(error);
            return res.status(401).json({
                success:false,
                message:"Invalid Token Provided"
            })
        }
        next();

    }catch(error){
        console.error(error);
        return res.status(401).json({
            success:false,
            message:"Token Verification Failed"
        })
        

    }
}
//isStudent
exports.isStudent=async(req,res,next)=>{
    try{
        if(req.existingUser.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"Access Denied for Student"
            })
        }
        next();

    }catch(error){
        console.error(error);
        return res.status(401).json({
            success:false,
            message:"User role does not match"
        })
    }
}
exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.existingUser.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"Access Denied for Admin"
            })
        }
        next();

    }catch(error){
        console.error(error);
        return res.status(401).json({
            success:false,
            message:"User role does not match"
        })
    }
}
exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.existingUser.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"Access Denied for Instructor"
            })

        }
        next();

    }catch(error){
        console.error(error);
        return res.status(401).json({
            success:false,
            message:"User role does not match"
        })
    }
}

