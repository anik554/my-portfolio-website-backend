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
  isFeatured?: boolean;
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
      typeof isFeatured === "boolean" && { isFeatured },
    ].filter(Boolean),
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
  return await prisma.$transaction(async (tx) => {
    await tx.blog.update({
      where: {
        id,
      },
      data: {
        views: { increment: 1 },
      },
    });

    return await tx.blog.findUnique({
      where: {
        id,
      },
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
  });
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

const getBlogStat = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregates = await prisma.blog.aggregate({
      _count: true,
      _sum: { views: true },
      _avg: { views: true },
      _min: { views: true },
      _max: { views: true },
    });
    const featuredCount = await tx.blog.count({
      where:{
        isFeatured:true
      }
    })
    const topFeatured = await tx.blog.findFirst({
      where:{
        isFeatured:true
      },
      orderBy:{views:"desc"}
    })

    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    const lastWeekBlogCount = await tx.blog.count({
      where:{
        createdAt: lastWeek
      }
    })

    return {
      stats: {
        totalBlogs: aggregates._count ?? 0,
        totalViews: aggregates._sum.views ?? 0,
        avgViews: aggregates._avg.views ?? 0,
        minViews: aggregates._min.views ?? 0,
        maxViews: aggregates._max.views ?? 0,
      },
      featured:{
        count: featuredCount ?? 0,
        topCount: topFeatured ?? 0
      },
      lastWeekBlogCount
    };
  });
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
  getBlogStat,
  updateBlog,
  deleteBlog,
};
