import { z } from "zod";
import { passwordRegex, phoneRegex } from "../../constants/regexPatters";

export const RoleEnum = z.enum(["ADMIN", "USER", "EDITOR"]);
export const UserStatusEnum = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);

export const createUserValidationZod = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must contain at least 8 charater, One uppercase, one lowercase, one number, and one special character"
    )
    .optional(),
  role: RoleEnum.optional().default("USER"),
  phone: z.string().regex(phoneRegex, "Invalid phone number format"),
  picture: z.string().url("Invalid picture url").optional().nullable(),
  status: UserStatusEnum.optional().default("ACTIVE"),
  isVerified: z.boolean().optional().default(true),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    )
    .optional(),

  role: RoleEnum.optional(),
  phone: z.string().regex(phoneRegex, "Invalid phone number format").optional(),
  picture: z.string().url("Invalid picture URL").optional().nullable(),
  status: UserStatusEnum.optional(),
  isVerified: z.boolean().optional(),
});
