import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  googleId?: string;
  name: string;
  email: string;
  password?: string;
}

const userSchema: Schema = new Schema(
  {
    googleId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
