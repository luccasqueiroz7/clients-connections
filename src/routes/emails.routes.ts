import { Router } from "express";
import { emailCreateController } from "../controllers/emails/emailCreate.controller";
import { emailDeleteController } from "../controllers/emails/emailDelete.controller";
import { emailListController } from "../controllers/emails/emailList.controller";
import { emailListOneController } from "../controllers/emails/emailListOne.controller";
import { emailListOneUserController } from "../controllers/emails/emailListOneUser.controller";
import { emailUpdatedController } from "../controllers/emails/emailUpdate.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const router = Router();

export const emailRoutes = () => {
  router.post("", authUserMiddleware, emailCreateController);
  router.get("", authUserMiddleware, emailListController);
  router.get("/:id", authUserMiddleware, emailListOneController);
  router.get("/users/:userId", authUserMiddleware, emailListOneUserController);
  router.patch("/:id", authUserMiddleware, emailUpdatedController);
  router.delete("/:id", authUserMiddleware, emailDeleteController);

  return router;
};
