import express from "express";
import { protect, role } from "../middleware/auth.js";
import { validate } from "../middleware/error.js";
import {
  userUpdateValidation,
  courseValidation,
} from "../middleware/validation.js";
import {
  getUserProfile,
  updateUserProfile,
  addCourse,
  upgradeToPremium,
} from "../controllers/user-controller.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, validate(userUpdateValidation), updateUserProfile);

router.post(
  "/courses",
  protect,
  role("college"),
  validate(courseValidation),
  addCourse
);

router.put("/premium", protect, upgradeToPremium);

export default router;
