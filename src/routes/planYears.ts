import express from "express";
import planYearsController from "../controllers/planYears";

const planYearsRouter = express.Router();

planYearsRouter.post("/:employerId", planYearsController.createPlanYear);
planYearsRouter.get("/", planYearsController.getPlanYears);

export default planYearsRouter;
