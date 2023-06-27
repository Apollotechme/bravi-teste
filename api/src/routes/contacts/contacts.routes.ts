import { Router } from "express";
import { ensureAuthMiddleware } from "../../middlewares/authUser.middleware";
import { createContactController } from "../../controllers/contact/createContact.controller";
import { schemaValidation } from "../../middlewares/schemaValidation.middleware";
import { registerContactSchema } from "../../schemas/contacts/registerContact.schema";

const contactApp = Router();

contactApp.post(
  "/",
  ensureAuthMiddleware,
  schemaValidation(registerContactSchema),
  createContactController
);

export { contactApp };
