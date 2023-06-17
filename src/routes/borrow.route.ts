import {
  addBorrow,
  editBorrow,
  getAllBorrow,
} from "@/controllers/borrow.controller";
import { verifyToken } from "@/middleware";
import { RoleType } from "@/types/auth";
import { Router } from "express";

const router: Router = Router();

const ACCESS_BORROW: RoleType[] = ["ADMIN", "EMPLOYEE"];

router.route("/borrow").get(verifyToken(ACCESS_BORROW), getAllBorrow);
// router.route("/borrow/:id").get(verifyToken(ACCESS_BORROW), getBookingById);
router.route("/borrow").post(verifyToken(ACCESS_BORROW), addBorrow);
router.route("/borrow/:id").put(verifyToken(ACCESS_BORROW), editBorrow);
// router.route("/borrow/:id").delete(verifyToken(ACCESS_BORROW), deleteBooking);

export default router;
