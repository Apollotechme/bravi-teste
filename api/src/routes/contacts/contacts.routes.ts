import { Router } from "express";
import { ensureAuthMiddleware } from "../../middlewares/authUser.middleware";
import { createContactController } from "../../controllers/contact/createContact.controller";
import { schemaValidation } from "../../middlewares/schemaValidation.middleware";
import { registerContactSchema } from "../../schemas/contacts/registerContact.schema";
import { updateContactSchema } from "../../schemas/contacts/updateContact.schema";
import { updateContactController } from "../../controllers/contact/updateContact.controller";
import { searchContactController } from "../../controllers/contact/searchContact.controller";
import { deleteContactController } from "../../controllers/contact/deleteContact.controller";

const contactApp = Router();

contactApp.post(
  "/",
  ensureAuthMiddleware,
  schemaValidation(registerContactSchema),
  createContactController
);

contactApp.patch(
  "/",
  ensureAuthMiddleware,
  schemaValidation(updateContactSchema),
  updateContactController
);

contactApp.get("/", ensureAuthMiddleware, searchContactController);

contactApp.delete(
  "/:contact_id",
  ensureAuthMiddleware,
  deleteContactController
);

export { contactApp };
