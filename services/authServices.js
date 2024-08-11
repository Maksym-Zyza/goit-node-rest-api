import bcrypt from "bcrypt";
import Users from "../db/models/users.js";

export const signup = async (data) => {
  try {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ ...data, password: hashPassword });

    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email already in user";
    }
    throw error;
  }
};
