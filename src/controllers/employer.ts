import { Response } from "express";
import { MyR } from "../middlewares/verifyToken";
import IEmployer from "./../interfaces/employer";
import { createNewEmployer, findEmployers } from "./../models/employerModel";

const createEmployer = async (req: MyR, res: Response): Promise<void> => {
  try {
    const newEmployer: IEmployer = await createNewEmployer(req.body);
    res.json({ newEmployer });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message, error });
    return;
  }
};

const getEmployers = async (req: MyR, res: Response): Promise<void> => {
  try {
    const { name, code } = req.query;
    const filter: {
      [prop: string]: { $regex: string; $options: string };
    } = {};
    name && (filter.name = { $regex: name as string, $options: "gi" });
    code && (filter.code = { $regex: code as string, $options: "gi" });
    const employers: IEmployer[] = await findEmployers(filter);
    res.json({ employers });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message, error });
    return;
  }
};

export default { createEmployer, getEmployers };
