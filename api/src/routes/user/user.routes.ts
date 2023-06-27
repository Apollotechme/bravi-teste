import { Router } from "express";
import { schemaValidation } from "../../middlewares/schemaValidation.middleware";
import { registerUserSchema } from "../../schemas/user/registerUser.schema";
import { createUserController } from "../../controllers/user/createUser.controller";
import { ensureAuthMiddleware } from "../../middlewares/authUser.middleware";
import { getOWnerUserController } from "../../controllers/user/getOwnerUser.controller";
import { updateUserController } from "../../controllers/user/updateUser.controller";
import { updateUserSchema } from "../../schemas/user/updateUser.schema";
import { deleteUserController } from "../../controllers/user/deleteUser.controllert";

const userApp = Router();

userApp.post("/", schemaValidation(registerUserSchema), createUserController);
userApp.get("/", ensureAuthMiddleware, getOWnerUserController);
userApp.patch(
  "/",
  ensureAuthMiddleware,
  schemaValidation(updateUserSchema),
  updateUserController
);

userApp.delete("/", ensureAuthMiddleware, deleteUserController);

export { userApp };
