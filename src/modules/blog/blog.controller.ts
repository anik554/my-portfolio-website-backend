import { Request,Response } from "express";
import { BlogServices } from "./blog.service";

const createBlog = async(req:Request, res:Response)=>{
    try {
        const blog = await BlogServices.createBlog(req.body)
        res.status(201).json(blog)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

const getAllBlogs = async(req:Request, res:Response)=>{
    try {
        const blogs = await BlogServices.getAllBlogs()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const BlogControllers = {
    createBlog,
    getAllBlogs
}