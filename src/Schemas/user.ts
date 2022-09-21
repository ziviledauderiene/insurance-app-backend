import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IUser, UserTypes } from "../interfaces";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: UserTypes, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  employer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Employer",
    required: true,
  },
  id: { type: String, required: true, default: () => uuidv4() },
});

export default mongoose.model<IUser>("User", UserSchema);
