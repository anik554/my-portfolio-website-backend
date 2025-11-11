import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const loginWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email Not Found!!");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password Incorrect");
  }

  const jwtPayload = {
    userId: isUserExist.id,
    email: isUserExist.email,
    role:isUserExist.role
  }

  const accessToken = jwt.sign(jwtPayload,"secret",{
    expiresIn: "1d"
  })

  console.log(accessToken)

  return isUserExist;
};

const googleLogin = async (
  data: Prisma.UserCreateInput
): Promise<Partial<User>> => {
  let user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data,
    });
  }
  return user;
};

export const AuthServices = {
  loginWithEmailAndPassword,
  googleLogin,
};
