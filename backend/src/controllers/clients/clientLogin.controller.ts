import { Request, Response } from "express";
import { IClientLogin } from "../../interfaces/clients";
import { clientLoginService } from "../../services/clients/clientLogin.service";

export const clientLoginController = async (req: Request, res: Response) => {
  const { username, password }: IClientLogin = req.body;

  const token = await clientLoginService({ username, password });

  return res.status(200).json({ token });
};
