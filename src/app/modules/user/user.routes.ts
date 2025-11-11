import express from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserValidationZod, updateUserSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../types/enum.types";
const router = express.Router();

router.post("/",validateRequest(createUserValidationZod),UserControllers.createUser);
router.get("/",checkAuth(Role.ADMIN, Role.SUPER_ADMIN),UserControllers.getAllUsers);
router.get("/:id", UserControllers.getSingleUser);
router.patch("/:id",checkAuth(...Object.values(Role)),validateRequest(updateUserSchema),UserControllers.updateUser);
router.delete("/:id", UserControllers.deleteUser);

export const UserRouter = router;
