import User from "../db/models/contacts.js";
import { where } from "sequelize";

const listContacts = () => User.findAll({ order: [["id", "desc"]] });

const addContact = (data) => User.create(data);

const getContactById = (id) => User.findByPk(id);

const updateContact = async (id, data) => {
  await User.update(data, {
    where: {
      id,
    },
  });

  return await getContactById(id);
};

const updateStatusContact = async (id, { favorite }) => {
  await User.update(
    { favorite },
    {
      where: {
        id,
      },
    }
  );

  return await getContactById(id);
};

const removeContact = async (id) => {
  const contact = await getContactById(id);

  User.destroy({
    where: {
      id,
    },
  });

  return contact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
