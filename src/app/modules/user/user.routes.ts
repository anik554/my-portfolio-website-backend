import express from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserValidationZod, updateUserSchema } from "./user.validation";
const router = express.Router();

router.post(
  "/",
  validateRequest(createUserValidationZod),
  UserControllers.createUser
);
router.get("/", UserControllers.getAllUsers);
router.get("/:id", UserControllers.getSingleUser);
router.patch(
  "/:id",
  validateRequest(updateUserSchema),
  UserControllers.updateUser
);
router.delete("/:id", UserControllers.deleteUser);

export const UserRouter = router;
