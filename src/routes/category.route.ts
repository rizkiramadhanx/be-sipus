
import { Router } from "express";
import { RoleType } from "../types/auth";
import { verifyToken } from "../middleware";
import { addCategory, deleteCategory, editCategory, getAllCategory, getCategoryById } from "../controllers/category.controller";

const router: Router = Router();

// this variabel is ILLEGAL
const ACCESS_CATEGORY: RoleType[] = ["ADMIN", "EMPLOYEE"];

router.route("/category").get(verifyToken(ACCESS_CATEGORY), getAllCategory);
router
  .route("/category/:id")
  .get(verifyToken(ACCESS_CATEGORY), getCategoryById);

router.route("/category").post(verifyToken(ACCESS_CATEGORY), addCategory);

router.route("/category/:id").put(verifyToken(ACCESS_CATEGORY), editCategory);

router
  .route("/category/:id")
  .delete(verifyToken(ACCESS_CATEGORY), deleteCategory);

export default router;
