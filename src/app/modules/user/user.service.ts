import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes" 
import bcrypt from "bcryptjs";
import { envVars } from "../../config/envVars";

const createUser = async (payload: Prisma.UserCreateInput): Promise<Partial<User>> => {
  const isUserExist = await prisma.user.findUnique({
    where:{
      email: payload.email
    }
  })

  if (isUserExist){
    throw new AppError(httpStatus.BAD_GATEWAY,"User Already Exist")
  }

  const hashedPassword = await bcrypt.hash(payload.password as string, Number(envVars.BCRYPT_SALT_ROUND))
  // const isPasswordMatch = await bcrypt.compare(payload.password as string,hashedPassword)

  const user = await prisma.user.create({
    select:{
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      auths: true,
      blogs: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role || "USER",
      phone: payload.phone,
      picture: payload.picture,
      status: payload.status || "ACTIVE",
      isVerified: payload.isVerified ?? true,

      // ✅ Create related auth provider record
      auths: {
        create: {
          provider: "credentials",
          providerId: payload.email,
        },
      },
    },
  });
  return user;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      auths: true,
      blogs: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};

const getSingleUser = async (id: number) => {
  const singleUser = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      auths: true,
      blogs: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return singleUser;
};

const updateUser = async (
  id: number,
  payload: Prisma.UserUpdateInput
): Promise<Partial<User>> => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      auths: true,
      blogs: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

const deleteUser = async (id: number) => {
  const userId = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  
  if(!userId){
    throw new Error("User Not Found!!!")
  }

  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
