import express from "express";
import claimsController from "../controllers/claims";

const claimsRouter = express.Router();

claimsRouter.get("/", claimsController.getAllClaims);

export default claimsRouter;
