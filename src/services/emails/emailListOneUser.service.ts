import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { Contact } from "../../entities/contacts.entity";
import { AppError } from "../../errors/AppError";

export const emailListOneUserService = async (userId: string) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const contactRepository = AppDataSource.getRepository(Contact);

  const client = await clientRepository.findOneBy({ id: userId });

  if (!client) {
    const contact = await contactRepository.findOneBy({ id: userId });
    if (!contact) {
      throw new AppError(404, "User not found");
    }

    return contact.emails;
  }

  return client.emails;
};
