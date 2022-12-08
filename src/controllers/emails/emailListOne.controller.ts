import { Request, Response } from "express";
import { emailListOneService } from "../../services/emails/emailListOne.service";

export const emailListOneController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const email = await emailListOneService(id);

  return res.status(200).json(email);
};
