import { Router } from "express";
import { validate, verifyToken } from "@/middleware";
import { LoginDTO, RegisterDTO } from "@/types/auth/schemaDTO";
import {
  Login,
  Me,
  RefreshToken,
  Register,
} from "@/controllers/auth.controller";

const router: Router = Router();

router.route("/login").post(Login);
router.route("/register").post(validate(RegisterDTO), Register);
router.route("/me").get(verifyToken(), Me);
router.route("/refresh-token").get(RefreshToken);

export default router;
