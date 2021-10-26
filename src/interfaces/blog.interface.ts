import { Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  author: string;
  content: string;
  date: string | Date;
  deleted: boolean;
}
