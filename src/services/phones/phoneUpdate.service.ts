import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Phone } from "../../entities/phones.entity";

export const phoneUpdatedService = async (number: string, id: string) => {
  const phoneRepository = AppDataSource.getRepository(Phone);

  const phoneExists = await phoneRepository.findOneBy({ id });
  if (!phoneExists) {
    throw new AppError(404, "Phone not found");
  }

  if (number) {
    if (number.length < 8 || number.length > 14) {
      throw new AppError(400, "Enter a valid phone number");
    }
  } else {
    throw new AppError(400, "Enter a valid phone number");
  }

  const updatedPhone = {
    number: number || phoneExists.number,
  };

  await phoneRepository.update(id, updatedPhone);
  const returnedPhone = await phoneRepository.findOneBy({ id });

  return returnedPhone;
};
