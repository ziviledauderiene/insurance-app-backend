import express from "express";
import employerController from "../controllers/employer";

const employerRouter = express.Router();

employerRouter.post("/", employerController.createEmployer);
employerRouter.get("/", employerController.getEmployers);
employerRouter.get("/:id", employerController.getEmployer);
employerRouter.delete("/:id", employerController.deleteEmployer);
employerRouter.patch("/:id", employerController.updateEmployer)

export default employerRouter