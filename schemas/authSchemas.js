import Joi from "joi";
import { emailRegexp } from "../constants.js";

export const authSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authVerifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing required field email",
    "string.empty": "Missing required field email",
    "string.pattern.base": "invalid email format",
  }),
});
