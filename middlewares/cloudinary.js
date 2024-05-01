import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "armanimages",
  api_key: "858691626622677",
  api_secret: "W3lYIdeSuu39iNeYwROq38yU54I",
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null

        // uploading file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder:"magnet_battery"
          });
        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error)
        return null
    }
}

export default uploadOnCloudinary