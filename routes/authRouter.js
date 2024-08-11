import { Router } from "express";

import authController from "../controllers/authControllers.js";

import validateBody from "../decorators/validateBody.js";

import { authSignupSchema } from "../schemas/authSchemas.js";

const singUpMiddleware = validateBody(authSignupSchema);

const authRouter = Router();

authRouter.post("/register", singUpMiddleware, authController.register);

authRouter.post("/login", singUpMiddleware, authController.login);

export default authRouter;
