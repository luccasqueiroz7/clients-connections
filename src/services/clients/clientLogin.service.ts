import { AppDataSource } from "../../data-source";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/AppError";
import { IClientLogin } from "../../interfaces/clients";

export const clientLoginService = async ({ username, password }: IClientLogin) => {
  const clientRepository = AppDataSource.getRepository(Client);

  if (!username || !password) {
    const field = !username ? "username" : "password";
    throw new AppError(400, `${field} is required a field`);
  }

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
