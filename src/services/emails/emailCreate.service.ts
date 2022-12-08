import { AppDataSource } from "../../data-source";
import { Email } from "../../entities/emails.entity";
import { Client } from "../../entities/clients.entity";
import { Contact } from "../../entities/contacts.entity";
import { AppError } from "../../errors/AppError";

export const emailCreateService = async ({ email, clientId, contactId }: any) => {
  // Conectar com contatos depois
  // Lembrar que tem que estar logado
  const emailRepository = AppDataSource.getRepository(Email);

  if (!clientId && !contactId) {
    throw new AppError(404, "Client or contact not found");
  }

  if (clientId && contactId) {
    throw new AppError(400, "only one between client and contact");
  }

  if (clientId) {
    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneBy({ id: clientId });

    if (!client) {
      throw new AppError(404, "Client not found");
    }

    const newEmail = await emailRepository.save({
      email,
      client: clientId,
    });

    const returnedEmail = await emailRepository.findOneBy({ id: newEmail.id });

    return returnedEmail;
  } else {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = await contactRepository.findOneBy({ id: contactId });

    if (!contact) {
      throw new AppError(404, "Contact not found");
    }

    const newEmail = await emailRepository.save({
      email,
      contact: contactId,
    });

    const returnedEmail = await emailRepository.findOneBy({ id: newEmail.id });

    return returnedEmail;
  }
};
