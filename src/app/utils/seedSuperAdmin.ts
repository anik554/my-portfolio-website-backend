import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import { envVars } from "../config/envVars";
import bcrypt from "bcryptjs";
import { Role, UserStatus } from "../types/enum.types";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findUnique({
      where: {
        email: envVars.SUPER_ADMIN_EMAIL,
      },
    });
    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist!");
      return;
    }
    const hashedPassword = await bcrypt.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const payload: Prisma.UserCreateInput = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      phone:"01734699652",
      status: UserStatus.ACTIVE,
      picture: null,
      auths: {
        create: {
          provider: "credentials",
          providerId: envVars.SUPER_ADMIN_EMAIL,
        },
      },
    };

    const superAdmin = await prisma.user.create({
      data: payload,
    });
    console.log("Super Admin Created Successfully!")
    console.log(superAdmin)
    return superAdmin;
  } catch (error) {
    console.error(error)
  }
};
