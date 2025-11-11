import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { handlePrismaError } from "../../errorHelpers/handlePrismaError";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
      const user = await UserServices.createUser(req.body);
      
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: user,
      });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Users retrived successfully",
      data: users,
    });
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const singleUser = await UserServices.getSingleUser(Number(userId));
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrived successfully",
      data: singleUser,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const singleUser = await UserServices.updateUser(Number(userId), req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CONTINUE,
      message: "User Updated successfully",
      data: singleUser,
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    await UserServices.deleteUser(Number(userId));
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Deleted successfully",
      data: null,
    });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
