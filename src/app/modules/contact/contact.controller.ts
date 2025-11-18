import { Request, Response } from "express";
import { ContactServices } from "./contact.service";

const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await ContactServices.createContact(req.body);
    res.status(201).json({
      statusCode: 201,
      message: "Send Message Successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ error: "Faild to Send Message", details: error });
  }
};

const getAllContact = async (req: Request, res: Response) => {
  try {
    const contacts = await ContactServices.getAllContact();
    res.status(200).json({
      statusCode: 200,
      message: "All Contact Retrived Successfully",
      data: contacts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Faild to retrived contacts data", details: error });
  }
};

export const ContactControllers = {
  createContact,
  getAllContact,
};
