import { z } from "zod";
import { UserCreateInputObjectSchema } from "../@generated/zod"; // ← 5 levels

export const UserCreateSchema = UserCreateInputObjectSchema
  .refine((data) => data.email.includes("@"), {
    message: "Invalid email format",
    path: ["email"],
  })
  .transform((data) => ({
    ...data,
    email: data.email.toLowerCase().trim(),
  }));