import { Router } from "express";
import { schemaValidation } from "../../middlewares/schemaValidation.middleware";
import { registerUserSchema } from "../../schemas/user/registerUser.schema";
import { createUserController } from "../../controllers/user/createUser.controller";
import { ensureAuthMiddleware } from "../../middlewares/authUser.middleware";
import { getOWnerUserController } from "../../controllers/user/getOwnerUser.controller";

const userApp = Router();

userApp.post("/", schemaValidation(registerUserSchema), createUserController);
userApp.get("/", ensureAuthMiddleware, getOWnerUserController);

export { userApp };
