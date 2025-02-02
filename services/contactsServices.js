import User from "../db/models/contacts.js";
import { where } from "sequelize";

const listContacts = (query = {}, { page, limit }) =>
  User.findAll({
    where: query,
    order: [["id", "desc"]],
    limit: Number(limit),
    offset: Number(page - 1) * Number(limit),
  });

const addContact = (data) => User.create(data);

const getContact = (query) => User.findOne({ where: query });

const updateContact = async (query, data) => {
  await User.update(data, { where: query });

  return await getContact(query);
};

const updateStatusContact = async (query, { favorite }) => {
  await User.update({ favorite }, { where: query });

  return await getContact(query);
};

const removeContact = async (query) => {
  const contact = await getContact(query);

  User.destroy({
    where: query,
  });

  return contact;
};

export default {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
