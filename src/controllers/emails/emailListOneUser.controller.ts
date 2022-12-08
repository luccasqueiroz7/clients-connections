import { Request, Response } from "express";
import { emailListOneUserService } from "../../services/emails/emailListOneUser.service";

export const emailListOneUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const emails = await emailListOneUserService(userId);

  return res.status(200).json(emails);
};
