import { Prisma, Project } from "@prisma/client";
import { prisma } from "../../config/db";

const createProject = async (
  payload: Prisma.ProjectCreateInput
): Promise<Project> => {
  const project = await prisma.project.create({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    data: payload,
  });
  return project;
};

const getAllProject = async () => {
  const pojects = await prisma.project.findMany({
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
  return pojects;
};

const singleProject = async (id: number) => {
  const project = await prisma.project.findUnique({
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
  return project;
};

const updateProject = async (
  id: number,
  payload: Prisma.ProjectUpdateInput
): Promise<Partial<Project>> => {
  const project = await prisma.project.update({
    where: {
      id,
    },
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
  return project;
};

const deleteproject = async (id: number) => {
  const projectId = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!projectId) {
    throw new Error("Project Not Found!!!");
  }

  const project = await prisma.project.delete({
    where: {
      id,
    },
  });
  return project;
};

export const ProjectServices = {
  createProject,
  getAllProject,
  singleProject,
  updateProject,
  deleteproject
};
