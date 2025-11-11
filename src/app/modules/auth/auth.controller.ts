import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const loginWithEmailAndPassword = catchAsync(
  async (req: Request, res: Response) => {
      const user = await AuthServices.loginWithEmailAndPassword(req.body);
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Login Successfully",
        data: user,
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
};
