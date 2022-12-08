import { Request, Response } from "express";
import { phoneCreateService } from "../../services/phones/phoneCreate.service";

export const phoneCreateController = async (req: Request, res: Response) => {
  const { number, clientId, contactId } = req.body;

  const phoneCreated = await phoneCreateService({ number, clientId, contactId });

  return res.status(201).json(phoneCreated);
};
