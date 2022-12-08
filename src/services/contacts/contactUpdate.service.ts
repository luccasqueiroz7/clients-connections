import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Contact } from "../../entities/contacts.entity";
import { IContactUpdate } from "../../interfaces/contacts";

export const contactUpdatedService = async ({ name }: IContactUpdate, id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id });
  if (!contact) {
    throw new AppError(404, "Contact not found");
  }

  if (!name) {
    throw new AppError(400, "Enter a valid name");
  }

  const updatedContact = {
    name: name || contact.name,
  };

  await contactRepository.update(id, updatedContact);
  const returnedContact = await contactRepository.findOneBy({ id });

  return returnedContact;
};
