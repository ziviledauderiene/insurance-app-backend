import { Types } from "mongoose";
import { IUser } from "../interfaces";
import User from "../Schemas/user";

export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  const data = await User.findOne(
    {
      username,
    },
    { _id: 0 }
  );
  return data;
};

export const getUsers = async (
  filter: Partial<IUser>,
  showEmployer: 0 | 1 = 0
): Promise<IUser[]> => {
  const projection: { [key: string]: number } = { password: 0, _id: 0, __v: 0 };
  !showEmployer && (projection.employer = showEmployer);
  return await User.find(filter, projection).lean();
};

export const createNewUser = async (
  data: IUser
): Promise<IUser & { _id: Types.ObjectId }> => await User.create(data);

export const getUserById = async (
  id: string,
  showEmployer: 0 | 1 = 0
): Promise<IUser | null> => {
  const projection: { [key: string]: number } = { password: 0, _id: 0, __v: 0 };
  !showEmployer && (projection.employer = showEmployer);
  return await User.find({ id }, projection).lean();
};

export const deleteUserById = async (id: string): Promise<number> => {
  const { deletedCount } = await User.deleteOne({ id });
  return deletedCount;
};

export const updateUserById = async (
  id: string,
  body: Partial<IUser>
): Promise<IUser | null> =>
  await User.findOneAndUpdate({ id }, { $set: body }, { new: true }).lean();
