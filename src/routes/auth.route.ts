import { Router } from 'express';
import { Login, Register } from '../controllers/auth.controller';

const router: Router = Router();

router.route('/login').post(Login);
router.route('/register').post(Register);

export default router;
