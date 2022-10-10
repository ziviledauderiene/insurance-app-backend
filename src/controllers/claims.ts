import { Response } from "express";
import { ClaimFilter, ClaimStatus, IClaim, MyR } from "../interfaces";
import { getClaims, updateClaimById } from "../models/claimModel";
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
      filter.claimNumber = { $regex: claimNumber, $options: "gi" };
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

const updateClaim = async (req: MyR, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const claim: IClaim | null = await updateClaimById(id, req.body);
    if (claim) {
      res.json({ message: `claim ${id} updated`, claim });
    } else {
      res.status(404).json({ message: `claim ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { getAllClaims, updateClaim };
