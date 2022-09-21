import { NextFunction, Response } from "express";
import { MyR } from "../interfaces";

const authUserType =
  (allowedUserTypes: string[]) =>
  (req: MyR, res: Response, next: NextFunction): void => {
    if (req.jwt && !allowedUserTypes.includes(req.jwt.userType)) {
      res
        .status(403)
        .json({ message: "Access to the requested resource is forbidden" });
      return;
    }
    next();
  };

export default authUserType;
