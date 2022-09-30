import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { JWTUser } from "../interfaces";
import logging from "../utils/logging";
import ProcessEnv from "../utils/env.d";

dotenv.config();

const { JWT_SECRET, JWT_ISSUER }: ProcessEnv = process.env;

const NAMESPACE = "Auth";

const signJWT = (
  user: JWTUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  const {
    username,
    firstName,
    lastName,
    email,
    userType,
    employer,
    id,
  }: JWTUser = user;
  logging.info(NAMESPACE, `Attempting to sign token for ${id}`);
  try {
    jwt.sign(
      {
        username,
        firstName,
        lastName,
        email,
        userType,
        employer,
        id,
      },
      JWT_SECRET,
      {
        issuer: JWT_ISSUER,
        algorithm: "HS256",
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    logging.info(NAMESPACE, error.message, error);
    callback(error, null);
  }
};

export default signJWT;
