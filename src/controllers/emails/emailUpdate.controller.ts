import { Request, Response } from "express";
import { emailUpdatedService } from "../../services/emails/emailUpdate.service";

export const emailUpdatedController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;

  const updatedEmail = await emailUpdatedService(email, id);

  return res.status(200).json(updatedEmail);
};
