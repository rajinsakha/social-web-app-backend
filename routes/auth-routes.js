import express from "express";
import { registerUser, loginUser } from "../controllers/auth-controller.js";
import {
  registerValidation,
  loginValidation,
} from "../middleware/validation-middleware.js";
import { validate } from "../middleware/error-middleware.js";
import { protect } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/register", validate(registerValidation), registerUser);
router.post("/login", validate(loginValidation), loginUser);
router.get("/verify", protect, verifyToken);

export default router;
