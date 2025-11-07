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
        }
    })
    return blog
}


export const BlogServices = {
    createBlog
}