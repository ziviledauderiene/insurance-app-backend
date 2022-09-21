import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { JWTUser, MyR } from "../interfaces";
import ProcessEnv from "../utils/env.d";
import logging from "../utils/logging";

dotenv.config();

const { JWT_SECRET }: ProcessEnv = process.env;

const NAMESPACE = "Auth";

const verifyToken = (req: MyR, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Validating token");

  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (token && JWT_SECRET) {
    jwt.verify(
      token,
      JWT_SECRET,
      (
        error: VerifyErrors | null,
        decoded?: (JwtPayload & JWTUser) | unknown
      ) => {
        if (error) {
          res.status(403).json({
            message: error,
            error,
          });
          return;
        }
        if (typeof decoded === "object" && decoded !== null) {
          req.jwt = decoded as JwtPayload & JWTUser;
          next();
        } else {
          res.status(403).json({
            message: "Magical token received",
            error,
          });
        }
      }
    );
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default verifyToken;
