import {
  getBookById,
  addBook,
  deleteBook,
  editBook,
  getAllBook,
} from "@/controllers/book.controller";
import { verifyToken } from "@/middleware";
import { RoleType } from "@/types/auth";
import { Router } from "express";

const router: Router = Router();

// this variabel is ILLEGAL
const ACCESS_BOOK: RoleType[] = ["ADMIN", "EMPLOYEE"];

router.route("/book").get(verifyToken(ACCESS_BOOK), getAllBook);
router.route("/book/:id").get(verifyToken(ACCESS_BOOK), getBookById);
router.route("/book").post(verifyToken(ACCESS_BOOK), addBook);
router.route("/book/:id").put(verifyToken(ACCESS_BOOK), editBook);
router.route("/book/:id").delete(verifyToken(ACCESS_BOOK), deleteBook);

export default router;
