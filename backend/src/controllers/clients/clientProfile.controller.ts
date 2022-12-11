import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { clientProfileService } from "../../services/clients/clientProfile.service";

export const clientProfileController = async (req: Request, res: Response) => {
  const { userId } = req;

  const client = await clientProfileService(userId);

  return res.status(200).json(instanceToPlain(client));
};
