/* eslint-disable no-unused-vars */
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Document, Types } from "mongoose";

export enum UserTypes {
  ADMIN = "admin",
  EMPLOYER = "employer",
  CONSUMER = "consumer",
}

export interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserTypes;
  employer: string;
  id?: string;
}

export type IUserDoc = Document<Types.ObjectId, never, IUser> 

export type JWTUser = Omit<IUser, "password">;

export interface MyR extends Request {
  jwt?: JwtPayload & JWTUser;
}

export interface IEmployer extends Document {
  id: string;
  name: string;
  code: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  logo?: string;
}
