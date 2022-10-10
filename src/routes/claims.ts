import express from "express";
import claimsController from "../controllers/claims";

const claimsRouter = express.Router();

claimsRouter.get("/", claimsController.getAllClaims);
claimsRouter.patch("/:id", claimsController.updateClaim);

export default claimsRouter;
