import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

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

schema.methods.setPassword = function (password: string): void {
  this.password = bcrypt.hashSync(password, +process.env.HASH_ID_SALT);
};

schema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

export const UserSchema = schema;
