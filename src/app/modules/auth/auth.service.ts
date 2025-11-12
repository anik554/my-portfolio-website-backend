import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";

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

  const userTokens = createUserTokens(isUserExist)
  const {password: pass, ...userWithoutPassword }=isUserExist

  return {
    accessToken:userTokens.accessToken,
    refreshToken:userTokens.refreshToken,
    user:userWithoutPassword 
  };
};

const getNewAccessToken =async(refreshToken:string)=>{
  const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
  return {
    accessToken:newAccessToken
  }
}

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
  getNewAccessToken
};
