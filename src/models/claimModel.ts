import { ClaimFilter, IClaim } from "../interfaces/index";
import Claim from "../Schemas/claim";

export const getClaims = async (filter: ClaimFilter): Promise<IClaim[]> => {
  const projection: { [key: string]: number } = { _id: 0, employer: 0 };
  return await Claim.find(filter, projection).lean();
};

export const updateClaimById = async (
  id: string,
  body: Partial<IClaim>
): Promise<IClaim | null> =>
  await Claim.findOneAndUpdate({ id }, { $set: body }, { new: true }).lean();
