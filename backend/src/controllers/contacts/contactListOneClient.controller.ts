import { Request, Response } from "express";
import { contactListOneClientService } from "../../services/contacts/contactListOneClient.service";

export const contactListOneClientController = async (req: Request, res: Response) => {
  const { userId } = req;
  const contacts = await contactListOneClientService(userId);

  return res.status(200).json(contacts);
};
