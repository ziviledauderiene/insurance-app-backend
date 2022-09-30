import { Response } from "express";
import { ClaimFilter, ClaimStatus, IClaim, MyR } from "../interfaces";
import { getClaims } from "../models/claims";
import { getEmployersObjectId } from "../models/employerModel";

const getAllClaims = async (req: MyR, res: Response): Promise<void> => {
  const { employer, claimNumber, status } = req.query;
  const filter: ClaimFilter = {};
  try {
    if (typeof employer === "string") {
      const { _id } = await getEmployersObjectId(employer);
      filter.employer = _id;
    }
    if (typeof claimNumber === "string") {
      filter.claimNumber = { $regex: claimNumber as string, $options: "gi" };
    }
    if (typeof status === "string") {
      filter.status = status as ClaimStatus;
    }
    const claims: IClaim[] = await getClaims(filter);
    res.json({ claims });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export default { getAllClaims };
