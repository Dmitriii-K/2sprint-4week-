import { Router } from "express";
import { AuthController } from "./authController";
import { getUserInformation } from "./getController";
import { authCheckValidation, inputCheckErrorsMiddleware, registrationEmail, validationCode, userInputValidation, userRegistrationValidation } from "../middlewares/middlewareForAll";
import { bearerAuth } from "../middlewares/middlewareForAll";

export const authRouter = Router();

authRouter.post("/login", authCheckValidation, inputCheckErrorsMiddleware, AuthController.authLoginUser);
authRouter.post("/registration", userRegistrationValidation, inputCheckErrorsMiddleware, AuthController.authRegistration);
authRouter.post("/registration-confirmation", validationCode, inputCheckErrorsMiddleware, AuthController.authRegistrationConfirmation);
authRouter.post("/registration-email-resending", registrationEmail, inputCheckErrorsMiddleware, AuthController.authRegistrationEmailResending);
authRouter.get("/me", bearerAuth, getUserInformation);
