import { Request, Response } from "express";
import { contactDeleteService } from "../../services/contacts/contactDelete.service";

export const contactDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await contactDeleteService(id);

  return res.status(204).send();
};
