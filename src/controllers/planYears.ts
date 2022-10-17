import { Response } from "express";
import Joi from "joi";
import addOneYear from "../functions/helpers";
import {
  IPlanYear,
  MyR,
  PayrollFrequency,
  Plan,
  PlanYearStatus,
} from "../interfaces";
import { getEmployersObjectId } from "../models/employerModel";
import {
  createNewPlanYear,
  deletePlanYearById,
  findPlanYears,
  initializePlanYearById,
} from "../models/planYearsModel";
import { uuidPattern } from "../utils/patterns";

const yesterday = new Date(Date.now() - 86400000);
const planYearValidationSchema = Joi.object({
  startDate: Joi.date().greater(yesterday).required(),
  endDate: Joi.date()
    .greater(Joi.ref("startDate"))
    .less(
      Joi.ref("startDate", {
        adjust: (startDate: Date) => addOneYear(startDate),
      })
    ),
  payrollFrequency: Joi.string()
    .valid(...Object.values(PayrollFrequency))
    .required(),
  plan: Joi.string()
    .valid(...Object.values(Plan))
    .required(),
  name: Joi.string().required(),
  contributions: Joi.number().positive().precision(2).required(),
  status: Joi.string()
    .valid(...Object.values(PlanYearStatus))
    .required(),
  employerId: Joi.string().pattern(uuidPattern).required(),
});

const PlanYearStatusValidationSchema = Joi.object({
  status: Joi.string().valid(PlanYearStatus.notInitialized).required(),
  id: Joi.string().pattern(uuidPattern).required(),
});

const createPlanYear = async (req: MyR, res: Response): Promise<void> => {
  const { employerId } = req.params;
  try {
    const { error } = planYearValidationSchema.validate({
      ...req.body,
      employerId,
    });
    if (error) {
      res.status(400).json({ message: error.message, error });
      return;
    }
    const newPlanYear: IPlanYear = await createNewPlanYear(
      employerId,
      req.body
    );
    res.json({ newPlanYear });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const getPlanYears = async (req: MyR, res: Response): Promise<void> => {
  const { employer } = req.query;
  const filter: Partial<IPlanYear> = {};
  try {
    if (typeof employer === "string") {
      const { _id } = await getEmployersObjectId(employer);
      filter.employer = _id;
    }
    const planYears: IPlanYear[] = await findPlanYears(filter);
    res.json({ planYears });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const deletePlanYear = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const planYear = await findPlanYears({ id });
    const { status } = planYear[0];
    const { error } = PlanYearStatusValidationSchema.validate({ status, id });
    if (error) {
      res.status(400).json({ message: error.message, error });
      return;
    }
    const deleted: number = await deletePlanYearById(id);
    if (deleted) {
      res.json({ message: `Plan Year ${id} deleted.` });
    } else {
      res.status(404).json({ message: `Plan Year ${id} not found.` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const initializePlanYear = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const { status } = (await findPlanYears({ id }))[0];
    const { error } = PlanYearStatusValidationSchema.validate({ status, id });
    if (error) {
      res.status(400).json({ message: error.message, error });
      return;
    }
    const planYear: IPlanYear | null = await initializePlanYearById(id);
    if (planYear) {
      res.json({ message: `Plan Year ${id} updated`, planYear });
    } else {
      res.status(404).json({ message: `Plan Year ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  createPlanYear,
  getPlanYears,
  deletePlanYear,
  initializePlanYear,
};
