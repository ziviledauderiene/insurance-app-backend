import Employer from "../Schemas/employer";
import IEmployer from "../interfaces/employer";

export const createNewEmployer = async ({
  name,
  code,
  street,
  city,
  state,
  zipCode,
  phone,
}: IEmployer): Promise<IEmployer> => {
  return await Employer.create({
    name,
    code,
    street,
    city,
    state,
    zipCode,
    phone,
  });
};

export const findEmployers = async (
  filter: Partial<IEmployer>
): Promise<IEmployer[]> => {
  return await Employer.find(filter).lean();
};
