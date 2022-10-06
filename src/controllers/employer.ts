import { Response } from "express";
import { IEmployer, MyR } from "../interfaces";
import {
  createNewEmployer,
  deleteEmployerById,
  findEmployers,
  getEmployerById,
  updateEmployerById
} from "../models/employerModel";

const createEmployer = async (req: MyR, res: Response): Promise<void> => {
  try {
    const newEmployer: IEmployer = await createNewEmployer(req.body);
    res.json({ newEmployer });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message, error });
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
  }
};

const deleteEmployer = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted: number = await deleteEmployerById(id);
    if (deleted) {
      res.json({ message: `employer ${id} deleted` });
    } else {
      res.status(404).json({ message: `employer ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const getEmployer = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const employer: IEmployer = await getEmployerById(id);
    if (employer) {
      res.json({ employer });
    } else {
      res.status(404).json({ message: `employer ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const updateEmployer = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user: IEmployer | null = await updateEmployerById(id, req.body);
    if (user) {
      res.json({ message: `employer ${id} updated`, user });
    } else {
      res.status(404).json({ message: `employer ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { createEmployer, getEmployers, deleteEmployer, getEmployer, updateEmployer };
