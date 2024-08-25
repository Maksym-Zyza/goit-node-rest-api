import bcrypt from "bcrypt";
import Users from "../db/models/users.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

const { BASE_URL } = process.env;

export const findUser = (query) => Users.findOne({ where: query });

export const sendVerifyEmail = (email, verificationCode) => {
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
  };

  return sendEmail(verifyEmail);
};

export const register = async (data) => {
  try {
    const { password, email } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    const newUser = await Users.create({
      ...data,
      password: hashPassword,
      verificationToken,
      avatarURL,
    });

    sendVerifyEmail(email, verificationToken);

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
