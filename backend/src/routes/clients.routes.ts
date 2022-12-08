import { Router } from "express";
import { clientCreateController } from "../controllers/clients/clientCreate.controller";
import { clientDeleteController } from "../controllers/clients/clientDelete.controller";
import { clientListController } from "../controllers/clients/clientList.controller";
import { clientListOneController } from "../controllers/clients/clientListOne.controller";
import { clientUpdatedController } from "../controllers/clients/clientUpdate.controller";

const router = Router();

export const clientRoutes = () => {
  router.post("", clientCreateController);
  router.get("", clientListController);
  router.get("/:id", clientListOneController);
  router.delete("/:id", clientDeleteController);
  router.patch("/:id", clientUpdatedController);

  return router;
};
