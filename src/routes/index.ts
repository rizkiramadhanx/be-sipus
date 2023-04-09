import authRoute from './auth.route';
import express, { Router } from 'express';

const router: Router = express.Router();

const routes = [
  {
    path: '/api/v1',
    route: authRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
