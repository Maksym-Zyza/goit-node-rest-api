import contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const result = await contactsServices.listContacts(
    { owner },
    { page, limit }
  );
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.getContact({ id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.removeContact({ id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const { id: owner } = req.user;

  const result = await contactsServices.addContact({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Request body cannot be empty");
  }

  const result = await contactsServices.updateContact({ id, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Request body cannot be empty");
  }

  const result = await contactsServices.updateStatusContact(
    { id, owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
