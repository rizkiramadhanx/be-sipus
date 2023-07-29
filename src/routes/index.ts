import authRoute from "./auth.route";
import categoryRoute from "./category.route";
import languageRoute from "./language.route";
import authorRoute from "./author.route";
import bookRoute from "./book.route";
import bookingRoute from "./booking.route";
import studentRoute from "./student.route";
import borrowRoute from "./borrow.route";

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
  {
    path: "/api/v1",
    route: studentRoute,
  },
  {
    path: "/api/v1",
    route: borrowRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
