import bcrypt from "bcrypt";
import Users from "../db/models/users.js";
import gravatar from "gravatar";

export const findUser = (query) => Users.findOne({ where: query });

export const register = async (data) => {
  try {
    const { password, email } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    const newUser = await Users.create({
      ...data,
      password: hashPassword,
      avatarURL: avatar,
    });

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
