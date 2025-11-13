import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserTokens } from "../../utils/userTokens";
import { envVars } from "../../config/envVars";
import { Prisma } from "@prisma/client";

const loginWithEmailAndPassword = catchAsync(
  async (req: Request, res: Response) => {
      const loginInfo = await AuthServices.loginWithEmailAndPassword(req.body);
      setAuthCookie(res,loginInfo)
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Login Successfully",
        data: loginInfo,
      });
    } 
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
      throw new AppError(httpStatus.BAD_REQUEST, "No refresh token received from cookies")
    }
      const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string);
      setAuthCookie(res,tokenInfo.accessToken)
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
      });
    } 
);

const logout = catchAsync(
  async (req: Request, res: Response) => {
      res.clearCookie("accessToken",{
        httpOnly: true,
        secure: false,
        sameSite:"lax"
      })
      res.clearCookie("refreshToken",{
        httpOnly: true,
        secure: false,
        sameSite:"lax"
      })
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Loggout Successfully",
        data: null,
      });
    } 
);

const googleLogin = async (req: Request, res: Response) => {
  try {
    const user = await AuthServices.googleLogin(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const googleCallback = catchAsync(
  async (req: Request, res: Response, next:NextFunction) => {
    let redirectTo = req.query.state ? req.query.state as string : "" 
    if(redirectTo.startsWith("/")){
        redirectTo = redirectTo.slice(1)
    }
    const user= req.user as Prisma.UserCreateInput
    if(!user){
      throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }
    const tokenInfo = createUserTokens(user)
    setAuthCookie(res,tokenInfo)
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
    } 
);

export const AuthControllers = {
  loginWithEmailAndPassword,
  googleLogin,
  getNewAccessToken,
  logout,
  googleCallback
};
