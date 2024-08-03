import express from "express";
import contactsController from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

import validateBody from "../decorators/validateBody.js";

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const addContactMiddleware = validateBody(createContactSchema);
const updateContactMiddleware = validateBody(updateContactSchema);
const updateStatusSchema = validateBody(updateFavoriteSchema);

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", contactsController.getOneContact);

contactsRouter.delete("/:id", contactsController.deleteContact);

contactsRouter.post(
  "/",
  addContactMiddleware,
  contactsController.createContact
);

contactsRouter.put(
  "/:id",
  updateContactMiddleware,
  contactsController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  updateStatusSchema,
  contactsController.updateStatusContact
);

export default contactsRouter;
