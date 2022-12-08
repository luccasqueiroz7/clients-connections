import { Request, Response } from "express";
import { emailDeleteService } from "../../services/emails/emailDelete.service";

export const emailDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await emailDeleteService(id);

  return res.status(204).send();
};
