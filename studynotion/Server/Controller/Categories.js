
const Category=require('../Model/Category');

//create tag api
exports.createcategory=async(req,res)=>{
    try{
        //fetch data from request body
        const {name,description}=req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //create a entry in database
        const CategoryDetails=await Category.create({
            name:name,
            description:description
        });
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
            data:CategoryDetails
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Category cannot be created"
        })
    }
}
//get all tags
exports.getAllCategory=async(req,res)=>{
    try{
        //fetch all tags
        const allcategories=await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"Category fetched successfully",
            data:allcategories
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Category cannot be fetched"
        })
    }
}
//get category page details
exports.getcatergoryPage=async(req,res)=>{
    try{
        //get categoryId
        const {categoryId}=req.body;
        //get courses for specified categoryId
        const selectedCategory=await Category.findById(categoryId)
                                             .populate("courses")  
                                             .exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found"
            })
        }
        //get different courses for the category
        const allcategories=await Category.find({
                                                _id:{$ne:categoryId}
                                            })
                                            .populate("courses")
                                            .exec();
        //get top 10 selling courses
        const toptenCourses=await Category.find({}).sort({studentsEnrolled:-1}).limit(10);

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                allcategories,
                toptenCourses
            }
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Category page cannot be fetched"
        })
    }
}
