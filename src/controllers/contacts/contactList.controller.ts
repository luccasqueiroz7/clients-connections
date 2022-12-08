import { Request, Response } from "express";
import { contactListService } from "../../services/contacts/contactList.service";

export const contactListController = async (req: Request, res: Response) => {
  const contacts = await contactListService();

  return res.status(200).send(contacts);
};
