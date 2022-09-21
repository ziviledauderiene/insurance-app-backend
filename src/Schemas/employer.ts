import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IEmployer } from "../interfaces";

const employerSchema: Schema = new Schema({
  id: { type: String, required: true, default: () => uuidv4() },
  name: { type: String, required: true },
  code: { type: String, required: true, uppercase: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  logo: { type: String, lowercase: true },
});

export default mongoose.model<IEmployer>("Employer", employerSchema);
