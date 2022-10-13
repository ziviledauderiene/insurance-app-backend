import { Types } from "mongoose";
import { IPlanYear } from "../interfaces";
import PlanYear from "../Schemas/planYear";
import { getEmployersObjectId } from "./employerModel";

export const createNewPlanYear = async (
  employerId: string,
  data: IPlanYear
): Promise<IPlanYear & { _id: Types.ObjectId }> => {
  const { _id } = await getEmployersObjectId(employerId);
  const newData = { ...data, employer: _id };
  return await PlanYear.create(newData);
};

export const findPlanYears = async (
  filter: Partial<IPlanYear>
): Promise<IPlanYear[]> => {
  const projection: { [key: string]: number } = { _id: 0, __v: 0 };
  return await PlanYear.find(filter, projection).lean();
};
