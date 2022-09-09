import jwt from 'jsonwebtoken';
import logging from '../utils/logging';
import { JWTPayload } from '../interfaces/user';
import dotenv from 'dotenv'

dotenv.config();


const { JWT_SECRET, JWT_ISSUER } = process.env;

const NAMESPACE = 'Auth';

const signJWT = (
  user: JWTPayload,
  callback: (error: Error | null, token: string | null) => void
  ): void => {
  console.log(user, 'payload')
  logging.info(NAMESPACE, `Attempting to sign token for ${user.id}`);

  try {
    jwt.sign(
      {
        username: user.username,
      },
      JWT_SECRET,
      {
        issuer: JWT_ISSUER,
        algorithm: 'HS256',
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
