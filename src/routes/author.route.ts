
import { Router } from "express";
import { verifyToken } from "../middleware";
import { addAuthor, deleteAuthor, editAuthor, getAllAuthor, getAuthorById } from "../controllers/author.controller";
import { RoleType } from "../types/auth";

const router: Router = Router();

// this variabel is ILLEGAL
const ACCESS_AUTHOR: RoleType[] = ["ADMIN", "EMPLOYEE"];

router.route("/author").get(verifyToken(ACCESS_AUTHOR), getAllAuthor);
router.route("/author/:id").get(verifyToken(ACCESS_AUTHOR), getAuthorById);
router.route("/author").post(verifyToken(ACCESS_AUTHOR), addAuthor);
router.route("/author/:id").put(verifyToken(ACCESS_AUTHOR), editAuthor);
router.route("/author/:id").delete(verifyToken(ACCESS_AUTHOR), deleteAuthor);

export default router;
