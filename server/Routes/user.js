import express from "express"
import { getUser, logIn, register, updateUser, } from "../Controllers/users.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

// User registration
router.post('/register', register );

// User login
router.post('/login', logIn );

// Get user profile
router.get('/profile/:userId', verifyToken, getUser);

// Update user profile
router.put('/profile', updateUser);

export default router
