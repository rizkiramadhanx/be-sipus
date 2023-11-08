import express, { Express, Request, Response, json } from "express";
import { ENV } from "./config";
import cors from "cors";

const PORT = ENV.PORT;

const app: Express = express();

import allRoutes from "./routes";

// Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world 🌏");
});

// connect to DB
app.use(
  cors({
    origin: ["http://localhost:5137"],
  })
);


app.use(json());
app.use(allRoutes);

app.listen(PORT, () => {
  console.log("listening on PORT on " + PORT);
});
