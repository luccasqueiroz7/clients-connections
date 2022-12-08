import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Contact } from "../../entities/contacts.entity";

export const contactUpdatedService = async ({ name }: any, id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id });
  if (!contact) {
    throw new AppError(404, "Contact not found");
  }

  const updatedContact = {
    name: name || contact.name,
  };

  await contactRepository.update(id, updatedContact);
  const returnedContact = await contactRepository.findOneBy({ id });

  return returnedContact;
};
