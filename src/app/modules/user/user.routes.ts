import express from "express"
import { UserControllers } from "./user.controller"
import { validateRequest } from "../../middlewares/validateRequest"
import { UserCreateSchema } from "./user.validation"
const router = express.Router()

router.post("/",validateRequest(UserCreateSchema),UserControllers.createUser)
router.get("/",UserControllers.getAllUsers)
router.get("/:id",UserControllers.getSingleUser)
router.patch("/:id",UserControllers.updateUser)
router.delete("/:id",UserControllers.deleteUser)

export const UserRouter = router