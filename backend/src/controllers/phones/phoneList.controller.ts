import { Request, Response } from "express";
import { phoneListService } from "../../services/phones/phoneList.service";

export const phoneListController = async (req: Request, res: Response) => {
  const phones = await phoneListService();

  return res.status(200).send(phones);
};
