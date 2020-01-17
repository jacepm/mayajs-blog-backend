import { BlogController } from "./controllers/blog/blog.controller";
import { UserController } from "./controllers/user/user.controller";


export const routes = [
  {
    controllers: [
      BlogController,
      UserController
    ],
    middlewares: [],
    path: "",
  },
];