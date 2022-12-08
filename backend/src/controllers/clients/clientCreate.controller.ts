import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IClientRequest } from "../../interfaces/clients";
import { clientCreateService } from "../../services/clients/clientCreate.service";

export const clientCreateController = async (req: Request, res: Response) => {
  const { name, username, password, emails, phones }: IClientRequest = req.body;

  const clientCreated = await clientCreateService({ name, username, password, emails, phones });

  return res.status(201).json(instanceToPlain(clientCreated));
};
