import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";

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
        message: "Refresh Token Successfully",
        data: tokenInfo,
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

export const AuthControllers = {
  loginWithEmailAndPassword,
  googleLogin,
  getNewAccessToken
};
