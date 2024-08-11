import Joi from "joi";
import { emailRegexp } from "../constants.js";

export const authSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
