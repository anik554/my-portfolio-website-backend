import express from "express"
import { ProjectControllers } from "./project.controller"

const router = express.Router()

router.post("/",ProjectControllers.createProject)
router.get("/",ProjectControllers.getAllProject)
router.get("/:id",ProjectControllers.singleProject)
router.patch("/:id",ProjectControllers.updateProject)
router.delete("/:id",ProjectControllers.deleteProject)

export const ProjectRouter = router