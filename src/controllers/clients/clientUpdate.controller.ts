import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { clientUpdatedService } from "../../services/clients/clientUpdate.service";

export const clientUpdatedController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, username, password } = req.body;

  const updatedClient = await clientUpdatedService({ name, username, password }, id);

  return res.status(200).json(instanceToPlain(updatedClient));
};
