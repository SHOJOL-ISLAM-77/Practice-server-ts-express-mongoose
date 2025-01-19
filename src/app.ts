import bodyParser from "body-parser";
import cors from "cors";
import type { Application, Request, Response } from "express";
import express from "express";
import helmet from "helmet";
import { getSalesStats } from "./controllers/selesStats.controller";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();

// export const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(limiter);

app.get("/", getSalesStats);
app.use("/api/v1", router);
app.use(globalErrorHandler)

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Route not found");
});
export default app;
