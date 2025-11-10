import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError } from "zod";

export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error:any) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          path: err.path.join("."),
          message: err.message
        }));
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors
        });
      }
      next(error);
    }
  };
};