import { MongoSchema, MongoModel } from "@mayajs/mongo";

const options = {
  timestamps: {
    createdAt: "DateCreated",
    updatedAt: "DateUpdated",
  }
};

const schema = MongoSchema(
  {
    title: {
      required: [true, "Title is required."],
      type: String,
      unique: true
    },
    author: {
      required: [true, "Author is required."],
      type: String,
      unique: true
    },
    content: {
      required: [true, "Content is required."],
      type: String,
      unique: true
    },
    date: {
      default: Date.now(),
      required: [true, "Date is required."],
      type: Date
    },
    deleted: {
      default: false,
      type: Boolean
    }
  },
  options
);

export default MongoModel("Blog", schema);