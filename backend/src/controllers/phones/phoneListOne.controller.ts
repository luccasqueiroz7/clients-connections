import { Request, Response } from "express";
import { phoneListOneService } from "../../services/phones/phoneListOne.service";

export const phoneListOneController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const phone = await phoneListOneService(id);

  return res.status(200).json(phone);
};
