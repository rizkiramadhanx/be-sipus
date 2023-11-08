
import { Router } from "express";
import { RoleType } from "../types/auth";
import { verifyToken } from "../middleware";
import { addBooking, deleteBooking, editBooking, getAllBooking, getBookingById } from "../controllers/booking.controller";

const router: Router = Router();

// this variabel is ILLEGAL
const ACCESS_BOOKING: RoleType[] = ["ADMIN"];

router.route("/booking").get(verifyToken(ACCESS_BOOKING), getAllBooking);
router.route("/booking/:id").get(verifyToken(ACCESS_BOOKING), getBookingById);
router.route("/booking").post(verifyToken(ACCESS_BOOKING), addBooking);
router.route("/booking/:id").put(verifyToken(ACCESS_BOOKING), editBooking);
router.route("/booking/:id").delete(verifyToken(ACCESS_BOOKING), deleteBooking);

export default router;
