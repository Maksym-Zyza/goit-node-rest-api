import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const signup = async (req, res) => {
  const newUser = await authServices.signup(req.body);
  const { email, subscription } = newUser;

  res.status(201).json({
    email,
    subscription,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
