import { Schema, model } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  role: string;
  teamName: string;
  age: number;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    role: { type: String, required: true },
    teamName: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { collection: 'users', timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
