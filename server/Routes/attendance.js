import express from "express"
import { createAttendance, deleteAttendance, getAttendance, getAttendanceById } from "../Controllers/attendances.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// create a new attendance
router.post("/create" ,verifyToken, createAttendance)

//get all attendance
router.get("/attendance", getAttendance)

//get attendance record by Id
router.get("/:userId", verifyToken, getAttendanceById)

//delete an attendance record by Id
router.delete("/:id",verifyToken, deleteAttendance)

export default router