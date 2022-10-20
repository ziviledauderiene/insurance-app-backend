import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Date, Document, Types } from "mongoose";

export enum UserTypes {
  admin = "admin",
  employer = "employer",
  consumer = "consumer",
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

export type IUserDoc = Document<Types.ObjectId, never, IUser>;

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

export enum Plan {
  dental = "dental",
  medical = "medical",
}

export enum ClaimStatus {
  pending = "pending",
  approved = "approved",
  denied = "denied",
}

export interface IClaim {
  id: string;
  claimNumber: string;
  employer: string;
  consumer: string;
  date: Date;
  plan: Plan;
  amount: number;
  status: ClaimStatus | "";
}

export type ClaimFilter = Partial<
  Omit<IClaim, "claimNumber" | "status"> & {
    claimNumber: { $regex: string; $options: string };
    status: { $in: ClaimStatus[] };
  }
> & { page: number; limit: number };

export enum PayrollFrequency {
  weekly = "weekly",
  monthly = "monthly",
}

export enum PlanYearStatus {
  initialized = "initialized",
  notInitialized = "not initialized",
}

export interface IPlanYear {
  id: string;
  employer: string;
  startDate: Date;
  endDate: Date;
  payrollFrequency: PayrollFrequency;
  plan: Plan;
  name: string;
  contributions: number;
  status: PlanYearStatus;
}
