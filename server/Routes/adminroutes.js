import express from "express"
import { deleteAttendance, getCountStudents, getUsers, studentAttendances, updateAttendance } from "../Controllers/admincontrollers.js";
import { verifyRole, verifyToken } from "../verifyToken.js";
import { getAttendance } from "../Controllers/attendances.js";
import { getReports } from "../Controllers/getreports.js";
import { deleteUser } from "../Controllers/users.js";

const router = express.Router();

router.get("/users",verifyToken, verifyRole('admin'), getUsers )
router.get("/usersattendance",verifyToken, verifyRole('admin'), studentAttendances )
router.delete("/users/:id",verifyToken, verifyRole('admin'), deleteUser  )
router.get("/get-numbers",verifyToken, verifyRole('admin'), getCountStudents )
router.get("/attendance",verifyToken, verifyRole('admin'), getAttendance)
router.put("/attendance/:id",verifyToken, verifyRole('admin'), updateAttendance)
router.delete("/attendance/:id",verifyToken, verifyRole('admin'), deleteAttendance)
router.get("/reports",verifyToken, verifyRole('admin'), getReports)
router.put("/leave/:id/approve",verifyToken, verifyRole('admin'),)

export default router