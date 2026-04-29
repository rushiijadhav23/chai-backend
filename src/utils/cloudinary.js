import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// time taking operation so async
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return "No file path found"
    }
    //upload file on cloudinary
    const response = await cloudinary.v2.uploader
    .upload(localFilePath, {
      resource_type: "auto"
    })
    // file has been uploaded successfully
    console.log(response)
    console.log("file is uploaded on cloudinary", response.url);

    return response
  } catch (error) {
    // the file is on the server if the upload file is failed rm the file from server
    fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    return null 
  }
}



export {uploadOnCloudinary}