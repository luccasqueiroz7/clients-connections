import { Express } from "express";

import { clientRoutes } from "./clients.routes";
import { loginRoutes } from "./login.routes";

export const AppRoutes = (app: Express) => {
  app.use("/clients", clientRoutes());
  app.use("/login", loginRoutes());
};
