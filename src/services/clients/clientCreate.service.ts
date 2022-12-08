import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { Email } from "../../entities/emails.entity";
import { Phone } from "../../entities/phones.entity";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcryptjs";

export const clientCreateService = async ({ name, username, password, emails, phones }: any) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const emailRepository = AppDataSource.getRepository(Email);
  const phoneRepository = AppDataSource.getRepository(Phone);

  const usernameExists = await clientRepository.findOneBy({ username });
  if (usernameExists) {
    throw new AppError(400, "Username already exists");
  }

  const newClient = await clientRepository.save({
    name,
    username,
    password: bcrypt.hashSync(password, 10),
  });

  if (emails) {
    await Promise.all(
      emails.map(async (email: string) => {
        await emailRepository.save({
          email,
          client: newClient,
        });
      })
    );
  }

  if (phones) {
    await Promise.all(
      phones.map(async (number: string) => {
        await phoneRepository.save({
          number,
          client: newClient,
        });
      })
    );
  }

  const returnedClient = await clientRepository.findOneBy({ id: newClient.id });

  return returnedClient;
};
