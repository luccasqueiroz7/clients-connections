import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import bcrypt from "bcryptjs";
import { AppError } from "../../errors/AppError";

export const clientUpdatedService = async ({ name, username, password }: any, id: string) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ id });
  if (!client) {
    throw new AppError(404, "Client not found");
  }

  if (username) {
    const usernameExists = await clientRepository.findOneBy({ username });
    if (usernameExists) {
      throw new AppError(400, "Username already exists");
    }
  }

  if (password) {
    password = bcrypt.hashSync(password, 10);
  }

  const updatedClient = {
    name: name || client.name,
    username: username || client.username,
    password: password || client.password,
  };

  await clientRepository.update(id, updatedClient);
  const returnedClient = await clientRepository.findOneBy({ id });

  return returnedClient;
};
