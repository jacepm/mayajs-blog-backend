import { App } from "@mayajs/core";
import { Mongo } from "@mayajs/mongo";
import { routes } from "./app.routing.module";
import { environment as env } from "./environments";
import MongoDb from "./databases/mongo";

@App({
  cors: true,
  logs: "dev",
  port: 3333,
  databases: [MongoDb],
  routes,
})
export class AppModule {}
