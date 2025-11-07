import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createBlog = async (payload: Prisma.BlogCreateInput) => {
  const blog = await prisma.blog.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return blog;
};

const getAllBlogs = async ({
  page,
  limit,
  search,
  isFeatured,
}: {
  page: number;
  limit: number;
  search: string;
  isFeatured: boolean;
}) => {
  const skip = (page - 1) * limit;
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      typeof isFeatured === "boolean" && {isFeatured}
    ].filter(Boolean)
  };
  const blogs = await prisma.blog.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    where,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  const totalBlogs = await prisma.blog.count();
  return {
    total: totalBlogs,
    page,
    limit,
    totalPage: Math.ceil(totalBlogs / limit),
    data: blogs,
  };
};

const getSingleBlog = async (id: number) => {
  const singleBlog = await prisma.blog.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      thumbnail: true,
      isFeatured: true,
      tags: true,
      views: true,
      authorId: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
  return singleBlog;
};

const updateBlog = async (
  id: number,
  payload: Prisma.BlogUpdateInput
): Promise<Partial<Blog>> => {
  const blog = await prisma.blog.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      title: true,
      content: true,
      thumbnail: true,
      isFeatured: true,
      tags: true,
      views: true,
      authorId: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
  return blog;
};

const deleteBlog = async (id: number) => {
  const blogId = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  if (!blogId) {
    throw new Error("Blog Not Found!!!");
  }

  const blog = await prisma.blog.delete({
    where: {
      id,
    },
  });
  return blog;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
