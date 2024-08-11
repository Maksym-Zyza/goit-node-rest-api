import bcrypt from "bcrypt";
import Users from "../db/models/users.js";

export const findUser = (query) => Users.findOne({ where: query });

export const register = async (data) => {
  try {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ ...data, password: hashPassword });

    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email in use";
    }
    throw error;
  }
};

export const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) {
    return null;
  }
  return user.update(data, {
    returning: true,
  });
};
