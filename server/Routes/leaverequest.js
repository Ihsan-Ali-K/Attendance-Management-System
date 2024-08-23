import express from "express"
import { createLeaveReq, deleteRequest, getRequest, getallrequests } from "../Controllers/leavereqs.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/leavereq",verifyToken, createLeaveReq )
router.get("/leavereqs",verifyToken, getallrequests )
router.get("/leavereq/:userId",verifyToken, getRequest )
router.delete("/deletereq",verifyToken, deleteRequest )


export default router