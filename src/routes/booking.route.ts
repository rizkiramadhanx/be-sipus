import {
  addBooking,
  deleteBooking,
  getAllBooking,
  getBookingById,
} from "@/controllers/booking.controller";
import { verifyToken } from "@/middleware";
import { RoleType } from "@/types/auth";
import { Router } from "express";

const router: Router = Router();

// this variabel is ILLEGAL
const ACCESS_BOOKING: RoleType[] = ["ADMIN", "EMPLOYEE"];

router.route("/booking").get(verifyToken(ACCESS_BOOKING), getAllBooking);
router.route("/booking/:id").get(verifyToken(ACCESS_BOOKING), getBookingById);
router.route("/booking").post(verifyToken(ACCESS_BOOKING), addBooking);
// router.route("/booking/:id").put(verifyToken(ACCESS_BOOKING), editBook);
router.route("/booking/:id").delete(verifyToken(ACCESS_BOOKING), deleteBooking);

export default router;
