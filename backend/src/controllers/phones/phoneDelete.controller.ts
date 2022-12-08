import { Request, Response } from "express";
import { phoneDeleteService } from "../../services/phones/phoneDelete.service";

export const phoneDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await phoneDeleteService(id);

  return res.status(204).send();
};
