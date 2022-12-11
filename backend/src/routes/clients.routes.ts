import { Router } from "express";
import { clientCreateController } from "../controllers/clients/clientCreate.controller";
import { clientDeleteController } from "../controllers/clients/clientDelete.controller";
import { clientListController } from "../controllers/clients/clientList.controller";
import { clientListOneController } from "../controllers/clients/clientListOne.controller";
import { clientProfileController } from "../controllers/clients/clientProfile.controller";
import { clientUpdatedController } from "../controllers/clients/clientUpdate.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const router = Router();

export const clientRoutes = () => {
  router.post("", clientCreateController);
  router.get("/profile", authUserMiddleware, clientProfileController);
  router.get("", clientListController);
  router.get("/:id", clientListOneController);
  router.delete("/:id", clientDeleteController);
  router.patch("/:id", clientUpdatedController);

  return router;
};
