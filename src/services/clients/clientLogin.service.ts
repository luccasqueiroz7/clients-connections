import { AppDataSource } from "../../data-source";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/AppError";

export const clientLoginService = async ({ username, password }: any) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ username });
  if (!client) {
    throw new AppError(403, "Wrong email/password");
  }

  const correctPassword = bcrypt.compareSync(password, client.password);
  if (!correctPassword) {
    throw new AppError(403, "Wrong email/password");
  }

  const token = jwt.sign({ userId: client.id }, String(process.env.SECRET_KEY), {
    expiresIn: "1d",
  });

  return token;
};
