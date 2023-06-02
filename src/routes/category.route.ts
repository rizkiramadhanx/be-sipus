import {
  getCategoryById,
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
} from "@/controllers/category.controller";
import { Router } from "express";

const router: Router = Router();

/**
 * TODO : ADD MIDDLEWARE
 */

router.route("/category").get(getAllCategory);
router.route("/category/:id").get(getCategoryById);

router.route("/category").post(addCategory);

router.route("/category/:id").put(editCategory);

router.route("/category/:id").delete(deleteCategory);

export default router;
