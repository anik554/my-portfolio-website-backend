import { Prisma } from "@prisma/client";
import { generateToken, verifyToken } from "./jwt";
import { envVars } from "../config/envVars";
import { prisma } from "../config/db";
import { JwtPayload } from "jsonwebtoken";
import { UserStatus } from "../types/enum.types";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes"

export const createUserTokens = (user: Prisma.UserCreateInput) => {
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );
  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async(refreshToken:string)=>{
  const verifiedRefreshToken = verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload
  const isUserExist = await prisma.user.findUnique({where:{email:verifiedRefreshToken.email}})
  if(!isUserExist){
    throw new AppError(httpStatus.BAD_REQUEST,"User does not exist")
  }
  if(isUserExist.status === UserStatus.BLOCKED || isUserExist.status === UserStatus.INACTIVE){
    throw new AppError(httpStatus.BAD_REQUEST,`User is ${isUserExist.status}`)
  }
  const jwtPayload = {
    userId: isUserExist.id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );
  return {
    accessToken
  }
}
