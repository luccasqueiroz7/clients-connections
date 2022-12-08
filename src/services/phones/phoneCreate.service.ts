import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { Contact } from "../../entities/contacts.entity";
import { AppError } from "../../errors/AppError";
import { Phone } from "../../entities/phones.entity";

export const phoneCreateService = async ({ number, clientId, contactId }: any) => {
  // Conectar com contatos depois
  // Lembrar que tem que estar logado
  const phoneRepository = AppDataSource.getRepository(Phone);

  if (number.length < 8 || number.length > 14) {
    throw new AppError(400, "Enter a valid phone number");
  }

  if (!clientId && !contactId) {
    throw new AppError(404, "Client or contact not found");
  }

  if (clientId && contactId) {
    throw new AppError(400, "Only one between client and contact");
  }

  if (clientId) {
    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneBy({ id: clientId });

    if (!client) {
      throw new AppError(404, "Client not found");
    }

    const newPhone = await phoneRepository.save({
      number,
      client: clientId,
    });

    const returnedPhne = await phoneRepository.findOneBy({ id: newPhone.id });

    return returnedPhne;
  } else {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = await contactRepository.findOneBy({ id: contactId });

    if (!contact) {
      throw new AppError(404, "Contact not found");
    }

    const newPhone = await phoneRepository.save({
      number,
      contact: contactId,
    });

    const returnedPhone = await phoneRepository.findOneBy({ id: newPhone.id });

    return returnedPhone;
  }
};
