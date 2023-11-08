
import { Router } from "express";
import { RoleType } from "../types/auth";
import { verifyToken } from "../middleware";
import { addBorrow, getAllBorrow, returnBorrow } from "../controllers/borrow.controller";

const router: Router = Router();

const ACCESS_BORROW: RoleType[] = ["ADMIN", "EMPLOYEE"];

router.route("/borrow").get(verifyToken(ACCESS_BORROW), getAllBorrow);
// router.route("/borrow/:id").get(verifyToken(ACCESS_BORROW), getBookingById);
router.route("/borrow").post(verifyToken(ACCESS_BORROW), addBorrow);
router.route("/borrow/:id").put(verifyToken(ACCESS_BORROW), returnBorrow);
// router.route("/borrow/:id").delete(verifyToken(ACCESS_BORROW), deleteBooking);

export default router;
