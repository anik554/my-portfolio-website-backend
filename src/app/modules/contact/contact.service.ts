import { Prisma, Contact } from "@prisma/client";
import { prisma } from "../../config/db";

export const createContact = async (
  payload: Prisma.ContactCreateInput
): Promise<Contact> => {
  return prisma.contact.create({
    data: payload,
  });
};

const getAllContact = async () => {
  const contacts = await prisma.contact.findMany({});
  return contacts;
};

export const ContactServices = { createContact, getAllContact };
