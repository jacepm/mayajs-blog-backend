import { Mongo } from "@mayajs/mongo";
import { environment as env } from "../environments";
import blog from "../controllers/blog/blog.model";
import user from "../controllers/user/user.model";

export = Mongo({
  name: "main",
  connectionString: env.DB_CONNECT,
  schemas: [blog, user],
});
