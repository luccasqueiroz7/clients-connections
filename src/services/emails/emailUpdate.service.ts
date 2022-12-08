import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Email } from "../../entities/emails.entity";

export const emailUpdatedService = async (email: string, id: string) => {
  const emailRepository = AppDataSource.getRepository(Email);

  const emailExists = await emailRepository.findOneBy({ id });
  if (!emailExists) {
    throw new AppError(404, "Email not found");
  }

  if (email) {
    if (email.length < 3) {
      throw new AppError(400, "Enter a valid email");
    }
  } else {
    throw new AppError(400, "Enter a valid email");
  }

  const updatedEmail = {
    email: email || emailExists.email,
  };

  await emailRepository.update(id, updatedEmail);
  const returnedEmail = await emailRepository.findOneBy({ id });

  return returnedEmail;
};
