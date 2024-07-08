import { Request, Response } from "express";
import { LoginInputModel, LoginSuccessViewModel, RegistrationConfirmationCodeModel, RegistrationEmailResending } from "../input-output-types/auth-type";
import { OutputErrorsType } from "../input-output-types/output-errors-type";
import { jwtService } from "../adapters/jwtToken";
import { UserInputModel } from "../input-output-types/users-type";
import { authService } from "./authService";
import { bcryptService } from "../adapters/bcrypt";


export class AuthController {
  static authLoginUser = async (
    req: Request<{}, {}, LoginInputModel>,
    res: Response<LoginSuccessViewModel | OutputErrorsType>
  ) => {
    try {
      const authUser = await authService.checkCredentials(req.body.loginOrEmail);
      if (!authUser) {
        res.status(401).json({ errorsMessages: [{field: 'user', message: 'user not found'}] });
      } else {
        const isCorrect = await bcryptService.comparePasswords(req.body.password, authUser?.password);
        if(isCorrect) {
          const{ token: accessToken } = await jwtService.generateToken(authUser);
          res.status(200).json({accessToken});
          return;
        } else {
          res.status(401).json({ errorsMessages: [{field: 'password and login', message: 'password or login is wrong'}] });
        }
    };
    } catch (error) {
      console.log(error);
      res.sendStatus(505);
    }
  };

  static authRegistration = async (req:Request<{}, {}, UserInputModel>, res: Response) => {
    try {
      const registrationResult = await authService.registerUser(req.body);
      if(registrationResult) {
        res.sendStatus(204);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(505);
    }
  };

  static authRegistrationConfirmation = async (req: Request<{}, {}, RegistrationConfirmationCodeModel>, res: Response) => {
    try {
      const result = await authService.confirmEmail(req.body.code);
      if(result) {
        res.sendStatus(204);
      } else {
        res.status(400).send({errorsMessages: [{field: "code", message: " Code validation failure "}]})
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(505);
    }
  };

  static authRegistrationEmailResending = async (req: Request<{}, {}, RegistrationEmailResending>, res: Response) => {
    try {
      const emailResending = await authService.resendEmail(req.body.email);
      if (emailResending) {
        res.sendStatus(204);
      } else {
        res.status(400).json({ errorsMessages: [{ message: 'eanother error', field: 'email',}]
        });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(505);
    }
  }
};


