import { Types } from "mongoose";
import { IEmployer } from "../interfaces";
import Employer from "../Schemas/employer";

export const createNewEmployer = async (
  data: IEmployer
): Promise<IEmployer & { _id: Types.ObjectId }> => await Employer.create(data);

export const findEmployers = async (filter: {
  [prop: string]: { $regex: string; $options: string };
}): Promise<IEmployer[]> => await Employer.find(filter).lean();

export const deleteEmployerById = async (id: string): Promise<number> => {
  const { deletedCount } = await Employer.deleteOne({ id });
  return deletedCount;
};

export const getEmployersObjectId = async (
  id: string
): Promise<IEmployer & { _id: Types.ObjectId }> =>
  await Employer.findOne({ id }, { _id: 1 }).lean();

export const getEmployerById = async (
  id: string
): Promise<IEmployer & { _id: Types.ObjectId }> =>
  await Employer.findOne({ id }).lean();
