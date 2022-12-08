import { AppDataSource } from "../../data-source";
import { Email } from "../../entities/emails.entity";
import { AppError } from "../../errors/AppError";

export const emailDeleteService = async (id: string) => {
  const emailRepository = AppDataSource.getRepository(Email);
  const email = await emailRepository.findOneBy({ id });

  if (!email) {
    throw new AppError(404, "Email not found");
  }

  await emailRepository.delete(id);

  return;
};
