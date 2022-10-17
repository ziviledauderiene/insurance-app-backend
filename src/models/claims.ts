import { ClaimFilter, IClaim } from "../interfaces/index";
import Claim from "../Schemas/claim";

// later more exports will be added here
// eslint-disable-next-line import/prefer-default-export
export const getClaims = async (filter: ClaimFilter): Promise<IClaim[]> => {
  const projection: { [key: string]: number } = { _id: 0, employer: 0 };
  return await Claim.find(filter, projection).lean();
};
