import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logging from "../utils/logging";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET;

const NAMESPACE = "Auth";

export interface MyR extends Request {
  jwt?: jwt.JwtPayload;
}

const verifyToken = (req: MyR, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Validating token");

  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (token && JWT_SECRET) {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: error,

          error,
        });
      } else {
        if (typeof decoded === "string" || decoded === undefined) {
          return res.status(403).json({
            message: "Magical token received",
            error,
          });
        }
        req.jwt = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default verifyToken;
