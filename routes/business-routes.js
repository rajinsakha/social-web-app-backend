import express from "express";
import { protect, role } from "../middleware/auth-middleware.js";
import { validate } from "../middleware/error-middleware.js";
import {
  businessValidation,
  eventValidation,
  menuItemValidation,
  offerValidation,
  reviewValidation,
} from "../middleware/validation-middleware.js";
import {
  createBusinessProfile,
  addBusinessReview,
  createBusinessEvent,
} from "../controllers/business-controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  role("business"),
  validate(businessValidation),
  createBusinessProfile
);

router.post(
  "/:id/reviews",
  protect,
  check("id", "Invalid business ID").isMongoId(),
  validate(reviewValidation),
  addBusinessReview
);

router.post(
  "/:id/events",
  protect,
  role("business"),
  check("id", "Invalid business ID").isMongoId(),
  validate(eventValidation),
  createBusinessEvent
);

export default router;
