import { Request, Response } from "express";
import { IEmailRequest } from "../../interfaces/emails";
import { emailCreateService } from "../../services/emails/emailCreate.service";

export const emailCreateController = async (req: Request, res: Response) => {
  const { email, clientId, contactId }: IEmailRequest = req.body;

  const emailCreated = await emailCreateService({ email, clientId, contactId });

  return res.status(201).json(emailCreated);
};
