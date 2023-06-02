import {
  getLanguageById,
  addLanguage,
  deleteLanguage,
  editLanguage,
  getAllLanguage,
} from "@/controllers/language.controller";
import { verifyToken } from "@/middleware";
import { RoleType } from "@/types/auth";
import { Router } from "express";

const router: Router = Router();

// this variabel is ILLEGAL
const ACCESS_CATEGORY: RoleType[] = ["ADMIN", "EMPLOYEE"];

router.route("/language").get(verifyToken(ACCESS_CATEGORY), getAllLanguage);
router
  .route("/language/:id")
  .get(verifyToken(ACCESS_CATEGORY), getLanguageById);

router.route("/language").post(verifyToken(ACCESS_CATEGORY), addLanguage);

router.route("/language/:id").put(verifyToken(ACCESS_CATEGORY), editLanguage);

router
  .route("/language/:id")
  .delete(verifyToken(ACCESS_CATEGORY), deleteLanguage);

export default router;
