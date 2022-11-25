import express, { Express, urlencoded } from "express";
import cors from "cors";
import routes from "../routes";
import { connectMongoose } from './'
import passport from "passport";
require('../strategies/discord')
export async function createApp(): Promise<Express> {
  const app = express();
  await connectMongoose(process.env.MONGOOSE_URL)
  app.use(express.json());
  app.use(urlencoded({extended: false}));
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

  app.use(passport.initialize())
  app.use("/api", routes);
  return app;
}
