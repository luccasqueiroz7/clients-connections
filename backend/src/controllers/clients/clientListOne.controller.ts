import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { clientListOneService } from "../../services/clients/clientListOne.service";

export const clientListOneController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const client = await clientListOneService(id);

  return res.status(200).json(instanceToPlain(client));
};
