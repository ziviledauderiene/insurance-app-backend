/* eslint-disable consistent-return */
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import signJWT from "../functions/signToken";
import { IUser, MyR, UserTypes } from "../interfaces";
import { getEmployersObjectId } from "../models/employerModel";
import {
  createNewUser,
  deleteUserById,
  getUserById,
  getUserByUsername,
  getUsers,
  updateUserById,
} from "../models/userModel";
import logging from "../utils/logging";

const NAMESPACE = "User";

const MONGODB_DUPLICATE_CODE = 11000;

const validateToken = (_req: Request, res: Response) => {
  logging.info(NAMESPACE, "Token validated, user authorized.");

  return res.json({
    message: "Token(s) validated",
    tokenIsValid: true,
  });
};

const register = async (req: Request, res: Response): Promise<void> => {
  const { password, employer }: IUser = req.body;

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
    res.status(401).json({
      message: error.message,
      error,
    });
    return;
  }
  try {
    const { _id } = await getEmployersObjectId(employer);
    const user = await createNewUser({
      ...req.body,
      password: hash,
      employer: _id,
    });
    res.status(201).json({
      message: `User ${user.username} created successfully`,
      user,
    });
    return;
  } catch (error) {
    if (error.code === MONGODB_DUPLICATE_CODE) {
      res.status(400).json({
        friendlyMessage:
          "This username already exists. Please use different one.",
      });
      return;
    }
    throw error;
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);
  if (user) {
    bcryptjs.compare(password, user.password, (error, result) => {
      if (error || !result) {
        return res.status(401).json({
          message: "Unauthorized login attempt",
        });
      }
      signJWT(user, (_error, token) => {
        if (_error) {
          return res.status(500).json({
            message: _error.message,
            error: _error,
          });
        }
        return res.json({
          message: "Auth successful",
          token,
        });
      });
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized login attempt",
    });
  }
};

const getAllUsers = async (req: MyR, res: Response) => {
  const { userType, employer } = req.query;
  const filter: Partial<IUser> = {};
  userType && (filter.userType = userType as UserTypes);
  try {
    if (typeof employer === "string") {
      const { _id } = await getEmployersObjectId(employer);
      filter.employer = _id;
    }
    const showEmployer = employer ? 1 : 0;
    const users: IUser[] = await getUsers(filter, showEmployer);
    res.json({
      users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const getUser = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user: IUser | null = await getUserById(id);
    if (!user) {
      res.status(404).json({ friendlyMessage: "User not found" });
      return;
    }
    res.json({ user });
    return;
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteUser = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted: number = await deleteUserById(id);
    if (deleted) {
      res.json({ message: `User deleted` });
    } else {
      res.status(404).json({ friendlyMessage: `User ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateUser = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user: IUser | null = await updateUserById(id, req.body);
    if (user) {
      res.json({ message: `User ${user.username} updated successfully`, user });
    } else {
      res.status(404).json({ friendlyMessage: `User ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  validateToken,
  register,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
