import { Router } from "express";
import { contactCreateController } from "../controllers/contacts/contactCreate.controller";
import { contactDeleteController } from "../controllers/contacts/contactDelete.controller";
import { contactListController } from "../controllers/contacts/contactList.controller";
import { contactListOneController } from "../controllers/contacts/contactListOne.controller";
import { contactListOneClientController } from "../controllers/contacts/contactListOneClient.controller";
import { contactUpdatedController } from "../controllers/contacts/contactUpdate.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const router = Router();

export const contactRoutes = () => {
  router.post("", authUserMiddleware, contactCreateController);
  router.get("", authUserMiddleware, contactListController);
  router.get("/client", authUserMiddleware, contactListOneClientController);
  router.get("/:id", authUserMiddleware, contactListOneController);
  router.patch("/:id", authUserMiddleware, contactUpdatedController);
  router.delete("/:id", authUserMiddleware, contactDeleteController);

  return router;
};
