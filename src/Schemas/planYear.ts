import { NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import addOneYear from "../functions/helpers";
import {
  IPlanYear,
  PayrollFrequency,
  Plan,
  PlanYearStatus,
} from "../interfaces";

const planYearSchema: Schema = new Schema({
  id: { type: String, required: true, default: () => uuidv4() },
  employer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Employer",
  },
  startDate: { type: Date, required: true },
  endDate: {
    type: Date,
  },
  payrollFrequency: { type: String, enum: PayrollFrequency, required: true },
  plan: { type: String, enum: Plan, required: true },
  contributions: { type: Number, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: PlanYearStatus, required: true },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
planYearSchema.pre("save", function (next: NextFunction) {
  if (!this.endDate) {
    this.endDate = addOneYear(this.get("startDate"));
  }
  next();
});

export default mongoose.model<IPlanYear>("PlanYear", planYearSchema);
