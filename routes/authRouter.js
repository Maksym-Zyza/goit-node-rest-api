import { Router } from "express";

import authController from "../controllers/authControllers.js";

import validateBody from "../decorators/validateBody.js";

import { authSignupSchema } from "../schemas/authSchemas.js";

const singUpMiddleware = validateBody(authSignupSchema);

const authRouter = Router();

authRouter.post("/signup", singUpMiddleware, authController.signup);

export default authRouter;
