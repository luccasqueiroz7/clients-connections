import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/AppError";

export const clientListOneService = async (id: string) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOneBy({ id });

  if (!client) {
    throw new AppError(404, "Client not found");
  }

  return client;
};
