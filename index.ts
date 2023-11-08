import express, { Express, Request, Response, json } from "express";
import { ENV } from "./src/config";
import cors from "cors";

const PORT = ENV.PORT;

const app: Express = express();

import allRoutes from "./src/routes";

// Route

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world 🌏");
});

// connect to DB

app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  var oneof = false;
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    oneof = true;
  }
  if (req.headers["access-control-request-method"]) {
    res.header(
      "Access-Control-Allow-Methods",
      req.headers["access-control-request-method"]
    );
    oneof = true;
  }
  if (req.headers["access-control-request-headers"]) {
    res.header(
      "Access-Control-Allow-Headers",
      req.headers["access-control-request-headers"]
    );
    oneof = true;
  }
  if (oneof) {
    // @ts-ignore
    res.header("Access-Control-Max-Age", (60 * 60 * 24 * 365));
  }

  // intercept OPTIONS method
  if (oneof && req.method == "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});
app.use(json());
app.use(allRoutes);

app.listen(PORT, () => {
  console.log("listening on PORT on " + PORT);
});
