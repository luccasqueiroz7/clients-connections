import { Router } from "express";
import { clientLoginController } from "../controllers/clients/clientLogin.controller";

const router = Router();

export const loginRoutes = () => {
  router.post("", clientLoginController);

  return router;
};
