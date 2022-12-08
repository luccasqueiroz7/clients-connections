import { AppDataSource } from "../../data-source";
import { Phone } from "../../entities/phones.entity";
import { AppError } from "../../errors/AppError";

export const phoneListOneService = async (id: string) => {
  const phoneRepository = AppDataSource.getRepository(Phone);
  const phone = await phoneRepository.findOneBy({ id });

  if (!phone) {
    throw new AppError(404, "Phone not found");
  }

  return phone;
};
