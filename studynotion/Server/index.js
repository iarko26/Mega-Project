const express=require('express');

const app=express();
const cors=require('cors');
const userRoutes=require('./Routes/User');
const profileRoutes=require('./Routes/Profile');
const paymentRoutes=require('./Routes/Payment');
const courseRoutes=require('./Routes/Course');
const contactRoutes=require('./Routes/ContactR')
const database=require('./Config/database');
const cookieParser=require('cookie-parser');
const {cloudinaryConnect}=require('./Config/cloudinary');
const fileUpload=require('express-fileupload');
require('dotenv').config();
const PORT=process.env.PORT || 4000;
database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}))
cloudinaryConnect();
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/reach",contactRoutes);
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

