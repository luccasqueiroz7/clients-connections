import { AppDataSource } from "../../data-source";
import { Email } from "../../entities/emails.entity";

export const emailListService = async () => {
  const emailRepository = AppDataSource.getRepository(Email);
  const emails = await emailRepository.find();

  return emails;
};
