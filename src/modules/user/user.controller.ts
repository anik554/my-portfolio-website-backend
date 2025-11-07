import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    res.status(500).send(error);
    console.error(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const singleUser = await UserServices.getSingleUser(Number(userId));
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const singleUser = await UserServices.updateUser(Number(userId), req.body);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deleteUser = await UserServices.deleteUser(Number(userId));
    console.log("deleteUser", deleteUser);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({message:"internal Server Error"})
    console.error(error)
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
