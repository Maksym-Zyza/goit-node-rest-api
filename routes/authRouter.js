import { Router } from "express";

import authController from "../controllers/authControllers.js";

import validateBody from "../decorators/validateBody.js";

import { authSignupSchema } from "../schemas/authSchemas.js";

import authenticate from "../middlewares/authenticate.js";

import upload from "../middlewares/upload.js";

const singUpMiddleware = validateBody(authSignupSchema);

const authRouter = Router();

authRouter.post("/register", singUpMiddleware, authController.register);

authRouter.post("/login", singUpMiddleware, authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
