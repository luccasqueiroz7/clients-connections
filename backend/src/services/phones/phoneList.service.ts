import { AppDataSource } from "../../data-source";
import { Phone } from "../../entities/phones.entity";

export const phoneListService = async () => {
  const phoneRepository = AppDataSource.getRepository(Phone);
  const phones = await phoneRepository.find();

  return phones;
};
