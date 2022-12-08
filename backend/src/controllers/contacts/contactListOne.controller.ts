import { Request, Response } from "express";
import { contactListOneService } from "../../services/contacts/contactListOne.service";

export const contactListOneController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const contact = await contactListOneService(id);

  return res.status(200).json(contact);
};
