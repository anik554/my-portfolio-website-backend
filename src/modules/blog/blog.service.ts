import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createBlog = async(payload:Prisma.BlogCreateInput)=>{
    const blog = await prisma.blog.create({
        data: payload,
        select:{
            id: true,
            title:true,
            content:true,
            thumbnail:true,
            isFeatured:true,
            tags:true,
            views:true,
            authorId:true,
            author:true,
            createdAt:true,
            updatedAt:true,
        }
    })
    return blog
}

const getAllBlogs =async()=>{
    const blogs= await prisma.blog.findMany({
        select:{
            id: true,
            title:true,
            content:true,
            thumbnail:true,
            isFeatured:true,
            tags:true,
            views:true,
            authorId:true,
            author:true,
            createdAt:true,
            updatedAt:true,
        }
    })
    return blogs
}

export const BlogServices = {
    createBlog,
    getAllBlogs
}