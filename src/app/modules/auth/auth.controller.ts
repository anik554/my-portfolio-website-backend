import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const user = await AuthServices.loginWithEmailAndPassword(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

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
