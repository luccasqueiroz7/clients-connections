import { Express } from "express";

import { clientRoutes } from "./clients.routes";
import { contactRoutes } from "./contacts.routes";
import { emailRoutes } from "./emails.routes";
import { loginRoutes } from "./login.routes";
import { phoneRoutes } from "./phones.routes";

export const AppRoutes = (app: Express) => {
  app.use("/clients", clientRoutes());
  app.use("/login", loginRoutes());
  app.use("/emails", emailRoutes());
  app.use("/phones", phoneRoutes());
  app.use("/contacts", contactRoutes());
};
