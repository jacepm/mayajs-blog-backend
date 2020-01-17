import { BlogController } from "./controllers/blog/blog.controller";
import { UserController } from "./controllers/user/user.controller";
import { authToken } from "./middlewares";


export const routes = [
  {
    controllers: [
      BlogController,
      UserController
    ],
    middlewares: [authToken],
    path: "",
  },
];