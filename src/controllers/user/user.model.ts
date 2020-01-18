import { MongoSchema, MongoModel } from "@mayajs/mongo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { environment as env } from "../../environments"

const options = {
  timestamps: {
    createdAt: "DateCreated",
    updatedAt: "DateUpdated",
  }
};

const schema = MongoSchema(
  {
    name: {
      required: [true, "Name is required."],
      type: String,
      unique: true,
    },
    userName: {
      required: [true, "Username is required."],
      type: String,
      unique: true,
    },
    password: {
      required: [true, "Password is required."],
      type: String
    },
    email: {
      required: [true, "Email is required."],
      type: String,
      unique: true,
    },
    deleted: {
      default: false,
      type: Boolean
    },
    token: {
      default: "",
      type: String
    }
  },
  options
);

schema.methods.setPassword = function(password: string): void {
  this.password = bcrypt.hashSync(password, env.HASH_ID_SALT);
};

schema.methods.comparePassword = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.setToken = function(id: any): void {
  this.token = jwt.sign({ _id: id }, env.AUTH_TOKEN_KEY, { expiresIn: "1h" });
}

export default MongoModel("User", schema);