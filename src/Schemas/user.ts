import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  id: { type: String, required: true, default: () => uuidv4() },
});

export default mongoose.model<IUser>('User', UserSchema);
