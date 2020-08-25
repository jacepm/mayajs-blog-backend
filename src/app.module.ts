import { App } from "@mayajs/core";
import { Mongo } from "@mayajs/mongo";
import { routes } from "./app.routing.module";
import { environment as env } from "./environments";

@App({
  cors: true,
  logs: "dev",
  port: 3333,
  database: Mongo({
    name: "main",
    connectionString: env.DB_CONNECT,
  }),
  routes,
})
export class AppModule {}
