import { Schema } from 'mongoose';

const options = {
  timestamps: {
    createdAt: 'DateCreated',
    updatedAt: 'DateUpdated',
  },
};

const schema = new Schema(
  {
    title: {
      required: [true, 'Title is required.'],
      type: String,
      unique: true,
    },
    author: {
      required: [true, 'Author is required.'],
      type: String,
    },
    content: {
      required: [true, 'Content is required.'],
      type: String,
    },
    date: {
      default: Date.now(),
      required: [true, 'Date is required.'],
      type: Date,
    },
    deleted: {
      default: false,
      type: Boolean,
    },
  },
  options,
);

export const BlogSchema = schema;
