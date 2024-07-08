export type LoginInputModel = {
  loginOrEmail: string;
  password: string;
};

export type MeViewModel = {
email:	string;
login:	string;
userId:	string;
};

export type LoginSuccessViewModel = {
  accessToken: string;
};

export type RegistrationConfirmationCodeModel = {
  code: string;
};

export type RegistrationEmailResending = {
  email: string;
};

export type EmailConfirmationType = {
  confirmationCode: string;
  expirationDate: string;
  isConfirmed: boolean;
}

export type RegistrationUser = {
  login: string;
  password: string;
  email: string;
  createdAt: string;
  emailConfirmation: EmailConfirmationType;
};

export type RegistrationUserDBModel = {
  login: string;
  email: string;
  createdAt: string;
  emailConfirmation: EmailConfirmationType;
}