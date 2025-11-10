import { Prisma } from "@prisma/client";
import { Response } from "express";

export const handlePrismaError = (error: any, res: Response) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const field = (error.meta?.target as string[])?.[0] || "field";
      return res.status(400).json({
        success: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      });
    }
  }
  return res.status(500).json({
    success: false,
    message: "Database error",
  });
};