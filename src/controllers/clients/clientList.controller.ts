import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { clientListService } from "../../services/clients/clientList.service";

export const clientListController = async (req: Request, res: Response) => {
  const clients = await clientListService();

  return res.status(200).send(instanceToPlain(clients));
};
