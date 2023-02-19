import {v2 as cloudinary} from "cloudinary";
import { API_KEY, API_SECRET } from "../config.js";

cloudinary.config({
    cloud_name: "dnazobcrv",
    api_key: API_KEY,
    api_secret: API_SECRET
})
export const uploadImage = async(filepath)=>{
    return await cloudinary.uploader.upload(filepath,{
        folder: 'posts'
    })
}

export const deleteImage = async(id)=>{
    return await cloudinary.uploader.destroy(id)
}