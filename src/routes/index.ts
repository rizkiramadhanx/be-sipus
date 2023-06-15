import authRoute from "./auth.route";
import categoryRoute from "./category.route";
import languageRoute from "./language.route";
import authorRoute from "./author.route";
import bookRoute from "./book.route";
import bookingRoute from "./booking.route";

import express, { Router } from "express";

const router: Router = express.Router();

const routes = [
  {
    path: "/api/v1",
    route: authRoute,
  },
  {
    path: "/api/v1",
    route: categoryRoute,
  },
  {
    path: "/api/v1",
    route: languageRoute,
  },
  {
    path: "/api/v1",
    route: authorRoute,
  },
  {
    path: "/api/v1",
    route: bookRoute,
  },
  {
    path: "/api/v1",
    route: bookingRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
