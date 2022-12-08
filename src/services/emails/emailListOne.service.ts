import { AppDataSource } from "../../data-source";
import { Email } from "../../entities/emails.entity";
import { AppError } from "../../errors/AppError";

export const emailListOneService = async (id: string) => {
  const emailRepository = AppDataSource.getRepository(Email);
  const email = await emailRepository.findOneBy({ id });

  if (!email) {
    throw new AppError(404, "Email not found");
  }

  return email;
};
