
const Category=require('../Model/Category');
const Course = require('../Model/Course');

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
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
        .populate({path:"courses",match:{Status:"Published"},populate:([{path:"instructor"},{path:"ratingandreviews"}])}) 
                                             .exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found"
            })
        }
        if(selectedCategory.courses.length==0){
            console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
        }
      
      const categoriesExceptSelected = await Category.find({
    _id: { $ne: categoryId },
}).populate({ path: "courses", match: { Status: "Published" }, populate: [{ path: "instructor" }, { path: "ratingandreviews" }] });
		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
		}
        //get different courses for the category
        const allcategories= await Category.find().populate({path:"courses",match:{Status:"Published"},populate:([{path:"instructor"},{path:"ratingandreviews"}])});
        //get top 10 selling courses
        const allCourses=allcategories.flatMap((category)=>category.courses)
        const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,   
                differentCourses,
                mostSellingCourses
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
exports.addCourseToCategory = async (req, res) => {
	const { courseId, categoryId } = req.body;
	
	try {
		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}
		if(category.courses.includes(courseId)){
			return res.status(200).json({
				success: true,
				message: "Course already exists in the category",
			});
		}
		category.courses.push(courseId);
		await category.save();
		return res.status(200).json({
			success: true,
			message: "Course added to category successfully",
		});
	}
	catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}

