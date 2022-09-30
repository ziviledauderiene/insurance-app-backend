import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ClaimStatus, IClaim, Plan } from "../interfaces";

const claimSchema: Schema = new Schema({
  id: { type: String, required: true, default: () => uuidv4() },
  claimNumber: {
    type: String,
    required: true,
  },
  employer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Employer",
    required: true,
  },
  consumer: { type: String, required: true }, // change later - ObjectId, ref: "Consumer"
  date: { type: Date, required: true },
  plan: { type: String, enum: Plan, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ClaimStatus, required: true },
});

export default mongoose.model<IClaim>("Claim", claimSchema);
