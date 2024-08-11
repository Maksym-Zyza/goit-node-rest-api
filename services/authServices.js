import Users from "../db/models/users.js";

export const signup = async (data) => {
  try {
    const newUser = await Users.create(data);

    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email already in user";
    }
    throw error;
  }
};
