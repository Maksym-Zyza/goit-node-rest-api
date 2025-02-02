import Joi from "joi";
import { emailRegexp } from "../constants.js";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
  favorite: Joi.boolean(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
