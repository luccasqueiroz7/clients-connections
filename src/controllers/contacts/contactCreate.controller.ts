import { Request, Response } from "express";
import { contactCreateService } from "../../services/contacts/contactCreate.service";

export const contactCreateController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { name, emails, phones } = req.body;

  const contactCreated = await contactCreateService({ name, emails, phones }, userId);

  return res.status(201).json(contactCreated);
};
