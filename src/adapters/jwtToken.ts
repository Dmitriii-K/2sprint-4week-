import  jwt from 'jsonwebtoken';
import { SETTINGS } from '../settings';
import { UserDBModel } from '../input-output-types/users-type';
import {  WithId } from 'mongodb';

export type AccessPayloadType  = {
  userId: string;
  email: string,
    login: string,
}

export const jwtService = {
generateToken (user: WithId<UserDBModel>) {
  const payload: AccessPayloadType = {
    userId: user._id!.toString(),
    email: user.email,
    login: user.login,
  };
  const options = {
    expiresIn: '1h' 
  };
  const secretKey = SETTINGS.JWT_SECRET_KEY; 
  const token:string = jwt.sign(payload, secretKey, options);
  return {token};
},
getUserIdByToken (token:string) : AccessPayloadType | null {
    try {
    return jwt.verify(token, SETTINGS.JWT_SECRET_KEY) as AccessPayloadType;
    } catch (error) {
        return null;
      }
  }
}
