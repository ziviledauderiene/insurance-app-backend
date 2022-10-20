import { Response } from "express";
import { IEmployer, MyR } from "../interfaces";
import {
  createNewEmployer,
  deleteEmployerById,
  findEmployers,
  getEmployerById,
  updateEmployerById,
} from "../models/employerModel";

const createEmployer = async (req: MyR, res: Response): Promise<void> => {
  try {
    const employer: IEmployer = await createNewEmployer(req.body);
    res.json({
      message: `New Employer ${employer.name} created successfully`,
      employer,
    });
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
      res.status(404).json({ friendlyMessage: `Employer ${id} not found` });
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
      res.status(404).json({ friendlyMessage: `Employer ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const updateEmployer = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const employer: IEmployer | null = await updateEmployerById(id, req.body);
    if (employer) {
      res.json({
        message: `Employer ${employer.name} updated successfully`,
        employer,
      });
    } else {
      res.status(404).json({ friendlyMessage: `Employer ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  createEmployer,
  getEmployers,
  deleteEmployer,
  getEmployer,
  updateEmployer,
};
