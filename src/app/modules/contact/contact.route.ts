import express from "express";
import { ContactControllers } from "./contact.controller";

const router = express.Router();

router.post("/", ContactControllers.createContact);
router.get("/", ContactControllers.getAllContact);

export const ContactRouter = router;
