import { Request, Response } from "express";
import { phoneListOneUserService } from "../../services/phones/phoneListOneUser.service";

export const phoneListOneUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const phones = await phoneListOneUserService(userId);

  return res.status(200).json(phones);
};
