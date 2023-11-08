
import { Router } from "express";
import { verifyToken } from "../middleware";
import { addBook, deleteBook, editBook, getAllBook, getBookById } from "../controllers/book.controller";
import { RoleType } from "../types/auth";

const router: Router = Router();

// this variabel is ILLEGAL
const ACCESS_BOOK: RoleType[] = ["ADMIN", "EMPLOYEE"];

router.route("/book").get(verifyToken(ACCESS_BOOK), getAllBook);
router.route("/book/:id").get(verifyToken(ACCESS_BOOK), getBookById);
router.route("/book").post(verifyToken(ACCESS_BOOK), addBook);
router.route("/book/:id").put(verifyToken(ACCESS_BOOK), editBook);
router.route("/book/:id").delete(verifyToken(ACCESS_BOOK), deleteBook);

export default router;
