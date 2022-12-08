import { AppDataSource } from "../../data-source";
import { Email } from "../../entities/emails.entity";
import { Phone } from "../../entities/phones.entity";
import { AppError } from "../../errors/AppError";
import { Contact } from "../../entities/contacts.entity";
import { Client } from "../../entities/clients.entity";

export const contactCreateService = async ({ name, emails, phones }: any, userId: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);
  const emailRepository = AppDataSource.getRepository(Email);
  const phoneRepository = AppDataSource.getRepository(Phone);

  const client = await clientRepository.findOneBy({ id: userId });

  if (!client) {
    throw new AppError(404, "Client not found");
  }

  const newContact = await contactRepository.save({
    name,
    client,
  });

  if (emails) {
    await Promise.all(
      emails.map(async (email: string) => {
        await emailRepository.save({
          email,
          contact: newContact,
        });
      })
    );
  }

  if (phones) {
    await Promise.all(
      phones.map(async (number: string) => {
        await phoneRepository.save({
          number,
          contact: newContact,
        });
      })
    );
  }

  const returnedContact = await contactRepository.findOneBy({ id: newContact.id });

  return returnedContact;
};
