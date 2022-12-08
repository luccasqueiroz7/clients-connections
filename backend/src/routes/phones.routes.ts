import { Router } from "express";
import { phoneCreateController } from "../controllers/phones/phoneCreate.controller";
import { phoneDeleteController } from "../controllers/phones/phoneDelete.controller";
import { phoneListController } from "../controllers/phones/phoneList.controller";
import { phoneListOneController } from "../controllers/phones/phoneListOne.controller";
import { phoneListOneUserController } from "../controllers/phones/phoneListOneUser.controller";
import { phoneUpdatedController } from "../controllers/phones/phoneUpdate.controller";

import { authUserMiddleware } from "../middlewares/authUser.middleware";

const router = Router();

export const phoneRoutes = () => {
  router.post("", authUserMiddleware, phoneCreateController);
  router.get("", authUserMiddleware, phoneListController);
  router.get("/:id", authUserMiddleware, phoneListOneController);
  router.get("/users/:userId", authUserMiddleware, phoneListOneUserController);
  router.patch("/:id", authUserMiddleware, phoneUpdatedController);
  router.delete("/:id", authUserMiddleware, phoneDeleteController);

  return router;
};
