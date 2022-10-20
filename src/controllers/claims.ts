import { Response } from "express";
import { ClaimFilter, ClaimStatus, IClaim, MyR } from "../interfaces";
import { getClaims, updateClaimById } from "../models/claimModel";
import { getEmployersObjectId } from "../models/employerModel";

const getAllClaims = async (req: MyR, res: Response): Promise<void> => {
  const { employer, claimNumber, status, page = 1, limit = 10 } = req.query;
  const filter: ClaimFilter = {
    page: page as number,
    limit: limit as number,
  };
  try {
    if (typeof employer === "string") {
      const { _id } = await getEmployersObjectId(employer);
      filter.employer = _id;
    }
    if (typeof claimNumber === "string") {
      filter.claimNumber = { $regex: claimNumber, $options: "gi" };
    }
    if (typeof status === "string") {
      const claimArray = [];
      if (status === "") {
        claimArray.push(
          ClaimStatus.approved,
          ClaimStatus.pending,
          ClaimStatus.denied
        );
      } else {
        claimArray.push(status as ClaimStatus);
      }
      filter.status = { $in: claimArray };
    }
    const { claims, count } = await getClaims(filter);
    res.json({ claims, count, page });
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
      res.json({
        message: `Claim ${claim.claimNumber} updated successfully`,
        claim,
      });
    } else {
      res.status(404).json({ friendlyMessage: `Claim ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { getAllClaims, updateClaim };
