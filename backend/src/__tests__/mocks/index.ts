import { IClientRequest } from "../../interfaces/clients";
import { IContactRequest } from "../../interfaces/contacts";

export const mockedClient: IClientRequest = {
  name: "Luccas Queiroz",
  username: "luccasqueiroz7",
  password: "123456",
  emails: ["luccas@mail.com", "tino@mail.com"],
  phones: ["(75)99245-8661"],
};

export const mockedClientWhitoutName = {
  username: "luccasqueiroz7",
  password: "123456",
  emails: ["luccas@mail.com", "tino@mail.com"],
  phones: ["(75)99245-8661"],
};

export const mockedClientWhitoutUsername = {
  name: "Luccas Queiroz",
  password: "123456",
  emails: ["luccas@mail.com", "tino@mail.com"],
  phones: ["(75)99245-8661"],
};

export const mockedClientWhitoutPassword = {
  name: "Luccas Queiroz",
  username: "luccasqueiroz7",
  emails: ["luccas@mail.com", "tino@mail.com"],
  phones: ["(75)99245-8661"],
};

export const mockedClientUdpate = {
  name: "Luccas Queiroz dos Santos",
};

export const mockedClientLogin = {
  username: "luccasqueiroz7",
  password: "123456",
};

export const mockedContact: IContactRequest = {
  name: "Luccas Queiroz",
  emails: ["luccas@mail.com", "tino@mail.com"],
  phones: ["(75)99245-8661"],
};
