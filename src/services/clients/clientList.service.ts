import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";

export const clientListService = async () => {
  const clientRepository = AppDataSource.getRepository(Client);
  const clients = await clientRepository.find();

  return clients;
};
