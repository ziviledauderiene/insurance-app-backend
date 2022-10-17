import express from "express";
import planYearsController from "../controllers/planYears";

const planYearsRouter = express.Router();

planYearsRouter.post("/:employerId", planYearsController.createPlanYear);
planYearsRouter.get("/", planYearsController.getPlanYears);
planYearsRouter.delete("/:id", planYearsController.deletePlanYear);
planYearsRouter.patch(
  "/:id/initialize",
  planYearsController.initializePlanYear
);

export default planYearsRouter;
