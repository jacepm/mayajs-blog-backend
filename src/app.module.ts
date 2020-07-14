import { App } from "@mayajs/core";
import { Mongo } from "@mayajs/mongo";
import { routes } from "./app.routing.module";
import { environment as env } from "./environments";

@App({
  cors: true,
  logs: "dev",
  port: 3333,
  database: Mongo({
    connectionString: env.DB_CONNECT,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  }),
  routes
})
export class AppModule {}