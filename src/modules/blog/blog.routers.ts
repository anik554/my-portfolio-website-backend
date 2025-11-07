import express from "express";
import { BlogControllers } from "./blog.controller";

const router = express.Router();
router.post("/",BlogControllers.createBlog)
export const BlogRouter = router;
