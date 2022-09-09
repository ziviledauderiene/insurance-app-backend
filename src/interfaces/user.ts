import { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';
import {Request} from 'express'

export default interface IUser extends Document {
  username: string;
  password: string;
  id: string;
}

export type JWTPayload =  Omit<IUser, 'password'>

export interface CustomRequest extends Request {
 ctx?: JwtPayload
}