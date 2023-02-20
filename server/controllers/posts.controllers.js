import Post from "../models/Posts.js"
import { deleteImage, uploadImage } from "../libs/cloudinary.js"
import fs from 'fs-extra'
export const getPosts = async(req,res)=>{
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}

export const createPosts = async(req,res)=> {
    try {
        const {title, description} = req.body
        let image;
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image={
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const newPost = new Post({title, description, image})
        await newPost.save()
        return res.json(newPost)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updatePosts = async (req,res)=> {
    try {
        const {title, description} = req.body
        let image
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image={
                url: result.secure_url,
                public_id: result.public_id
            }
            const post = await Post.findByIdAndUpdate(req.params.id, {title,description,image})
            await deleteImage(post.image.public_id)
            return res.json({title,description,image})
        }else{
            const post = await Post.findByIdAndUpdate(req.params.id, {title, description}, {new: true})
            return res.json(post)
        }
         //return res.json(post)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deletePosts = async(req,res)=> {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post)return res.sendStatus(404)

        if(post.image.public_id){
            await deleteImage(post.image.public_id)
        } 

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post)return res.sendStatus(404)
        return res.json(post)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
