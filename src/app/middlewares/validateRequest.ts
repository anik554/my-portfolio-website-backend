import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError } from "zod";

export const validateRequest =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body?.data) {
        try {
          req.body = JSON.parse(req.body.data);
        } catch {
          return res.status(400).json({
            success: false,
            message: "Invalid JSON format in 'data' field",
          });
        }
      }
      req.body = await schema.parseAsync(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formatted = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: formatted,
        });
      }

      next(error);
    }
  };
