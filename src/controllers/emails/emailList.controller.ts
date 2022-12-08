import { Request, Response } from "express";
import { emailListService } from "../../services/emails/emailList.service";

export const emailListController = async (req: Request, res: Response) => {
  const emails = await emailListService();

  return res.status(200).send(emails);
};
