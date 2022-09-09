import { Request, Response } from 'express';
import logging from '../utils/logging';
import bcryptjs from 'bcryptjs';
import User from '../Schemas/user';
import signJWT from '../functions/signToken';
import { getUserByUsername, createNewUser } from '../models/userModel';
import { CustomRequest } from '../interfaces/user';

const NAMESPACE = 'User';

const MONGODB_DUPLICATE_CODE = 11000;

const validateToken = (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'Token validated, user authorized.');

  return res.status(200).json({
    message: 'Token(s) validated',
    tokenIsValid: true,
  });
};

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const somePromise = () =>
    new Promise<string>((resolve, reject) => {
      bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
          reject(hashError);
        }
        resolve(hash);
      });
    });

  let hash;

  try {
    hash = await somePromise();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      error: error,
    });
  }
  try {
    const newUser = await createNewUser({ username, password: hash });
    return res.status(201).json({
      newUser,
    });
  } catch (error) {
    if (error.code === MONGODB_DUPLICATE_CODE) {
      return res.status(400).json({
        message: 'duplicate username',
      });
    }
    throw error
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);
  if (user) {
    bcryptjs.compare(password, user.password, (error, result) => {
      if (error || !result) {
        return res.status(401).json({
          message: 'Unauthorized login attempt',
        });
      }
      signJWT(user, (_error, token) => {
        if (_error) {
          return res.status(500).json({
            message: _error.message,
            error: _error,
          });
        }
        return res.status(200).json({
          message: 'Auth successful',
          token: token,
        });
      });
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized login attempt',
    });
  }
};

const getAllUsers = async (req: CustomRequest, res: Response) => {
  await User.find()
    .select('-password')
    .exec()
    .then((users) => {
      return res.status(200).json({
        users: users,
        count: users.length,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { validateToken, register, login, getAllUsers };
