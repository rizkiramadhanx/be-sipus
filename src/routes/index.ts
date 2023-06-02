import authRoute from "./auth.route";
import categoryRoute from "./category.route";

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
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
