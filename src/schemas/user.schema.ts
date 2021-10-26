import { Schema } from 'mongoose';

const options = {
  timestamps: {
    createdAt: 'DateCreated',
    updatedAt: 'DateUpdated',
  },
};

const schema = new Schema(
  {
    name: {
      required: [true, 'Name is required.'],
      type: String,
      unique: true,
    },
    userName: {
      required: [true, 'Username is required.'],
      type: String,
      unique: true,
    },
    password: {
      required: [true, 'Password is required.'],
      type: String,
    },
    email: {
      required: [true, 'Email is required.'],
      type: String,
      unique: true,
    },
    deleted: {
      default: false,
      type: Boolean,
    },
  },
  options,
);

export const UserSchema = schema;
