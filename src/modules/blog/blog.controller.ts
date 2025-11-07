import { Request,Response } from "express";
import { BlogServices } from "./blog.service";

const createBlog = async(req:Request, res:Response)=>{
    try {
        const blog = await BlogServices.createBlog(req.body)
        res.status(201).json(blog)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllBlogs = async(req:Request, res:Response)=>{
    try {
        const blogs = await BlogServices.getAllBlogs()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const singleBlog = await BlogServices.getSingleBlog(Number(blogId));
    res.status(200).json(singleBlog);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const singleBlog = await BlogServices.updateBlog(Number(blogId), req.body);
    res.status(200).json(singleBlog);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    await BlogServices.deleteBlog(Number(blogId));
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const BlogControllers = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
}