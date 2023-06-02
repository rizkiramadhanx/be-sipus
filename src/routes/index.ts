import authRoute from "./auth.route";
import categoryRoute from "./category.route";
import languageRoute from "./language.route";

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
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
