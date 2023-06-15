import {
  addStudent,
  deleteStudent,
  editStudent,
  getAllStudent,
  getStudentById,
} from "@/controllers/student.controller";
import { verifyToken } from "@/middleware";
import { RoleType } from "@/types/auth";
import { Router } from "express";

const router: Router = Router();

// this variabel is ILLEGAL
const ACCESS_STUDENT: RoleType[] = ["ADMIN", "EMPLOYEE"];

router.route("/student").get(verifyToken(ACCESS_STUDENT), getAllStudent);
router.route("/student/:id").get(verifyToken(ACCESS_STUDENT), getStudentById);
router.route("/student").post(verifyToken(ACCESS_STUDENT), addStudent);
router.route("/student/:id").put(verifyToken(ACCESS_STUDENT), editStudent);
router.route("/student/:id").delete(verifyToken(ACCESS_STUDENT), deleteStudent);

export default router;
