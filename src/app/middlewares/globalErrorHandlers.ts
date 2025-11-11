import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/envVars";
import AppError from "../errorHelpers/AppError";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errors: { path: string; message: string }[] = [];

  // 1. AppError (Custom)
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // 2. Zod Validation Error
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    errors = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  }

  // 3. Prisma Unique Constraint (P2002)
  else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    statusCode = 400;
    message = "Duplicate entry";
    const field = (err.meta?.target as string[])?.[0] || "field";
    errors = [{ path: field, message: `${field} already exists` }];
  }

  // 4. Prisma Other Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    message = err.message.replace(/\n/g, " ").trim();
  }

  // 5. General JS Error
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message || "Internal server error";
  }

  // Send Clean Response
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }), // Only include if exists
    ...(envVars.NODE_ENV === "development" && { stack: err.stack }),
  });
};