import { Request, Response } from "express";
import { phoneUpdatedService } from "../../services/phones/phoneUpdate.service";

export const phoneUpdatedController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { number } = req.body;

  const updatedPhone = await phoneUpdatedService(number, id);

  return res.status(200).json(updatedPhone);
};
