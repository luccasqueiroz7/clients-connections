import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { contactUpdatedService } from "../../services/contacts/contactUpdate.service";

export const contactUpdatedController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedContact = await contactUpdatedService({ name }, id);

  return res.status(200).json(instanceToPlain(updatedContact));
};
