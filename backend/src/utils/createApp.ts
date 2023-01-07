import express, { Express, urlencoded } from "express";
import cors from "cors";
import routes from "../routes";
import { alertsSetup, connectMongoose } from './'
import paypal from 'paypal-rest-sdk'
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
  paypal.configure({
    mode:'sandbox',
    client_id: 'ASgdeCAlq4j66xisRHOLFysw2flfMGQa3G-hrDezDVkKvdkWcIVlks9rp_xsC7BuSy71s9SadNPtxird',
    client_secret: 'EKzMa64bnGhjZ3Xg5nWErjvUiTzfK1JuYIFFzL-p0aVmFkh-3MNjjAxk1JCFuVb2EtUOU0ys4unnEIWp'
  })
  await alertsSetup()

  app.use("/api", routes);
  return app;
}
