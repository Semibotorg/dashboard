import express, { Express, urlencoded } from "express";
import cors from "cors";
import routes from "../routes";

export function createApp(): Express {
  const app = express();

  app.use(express.json());
  app.use(urlencoded({extended: true}));

  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

  app.use("/api", routes);
  return app;
}
