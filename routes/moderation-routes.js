import express from "express";
import { protect, admin } from "../middleware/auth-middleware.js";
import { validate } from "../middleware/error-middleware.js";
import { reportValidation } from "../middleware/validation-middleware.js";
import {
  createReport,
  getReports,
  resolveReport,
} from "../controllers/moderation-controller.js";
import { check } from "express-validator";

const router = express.Router();

router.post("/", protect, validate(reportValidation), createReport);

router.get("/", protect, admin, validate, getReports);

router.put(
  "/:id/resolve",
  protect,
  admin,
  check("id", "Invalid report ID").isMongoId(),
  validate,
  resolveReport
);

export default router;
