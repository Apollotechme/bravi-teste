import { Router } from "express";
import { schemaValidation } from "../../middlewares/schemaValidation.middleware";
import { registerUserSchema } from "../../schemas/user/registerUser.schema";
import { createUserController } from "../../controllers/user/createUser.controller";

const userApp = Router();

userApp.post("/", schemaValidation(registerUserSchema), createUserController);

export { userApp };
