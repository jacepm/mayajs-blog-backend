import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  userName: string;
  password: string;
  email: string;
  deleted: boolean;
  setPassword(password: string): string;
  comparePassword(password: string): boolean;
}
