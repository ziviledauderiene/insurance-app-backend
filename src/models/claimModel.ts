import { ClaimFilter, IClaim } from "../interfaces/index";
import Claim from "../Schemas/claim";

export const getClaims = async (
  filter: ClaimFilter
): Promise<{
  claims: IClaim[];
  count: number;
}> => {
  const projection: { [key: string]: number } = { _id: 0, employer: 0 };
  const { page, limit } = filter;
  const count = await Claim.find(filter, projection).countDocuments();
  const claims = await Claim.find(filter, projection)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();
  return { claims, count };
};

export const updateClaimById = async (
  id: string,
  body: Partial<IClaim>
): Promise<IClaim | null> =>
  await Claim.findOneAndUpdate({ id }, { $set: body }, { new: true }).lean();
