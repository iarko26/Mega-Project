const cloudinary=require('cloudinary').v2;
exports.uploadimg=async(file,folder,hieght,quality)=>{
    try{
        const options={
            folder
        }
        if(hieght){
            options.height=hieght;
        }
        if(quality){
            options.quality=quality;
        }
        options.resource_type='auto';
        return await cloudinary.uploader.upload(file.tempFilePath,options);

    }
    catch(error){
        throw new Error("Error occured while uploading image",error);
    }

}