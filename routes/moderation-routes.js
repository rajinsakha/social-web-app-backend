import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { validate } from "../middleware/error.js";
import { reportValidation } from "../middleware/validation.js";
import {
  createReport,
  getReports,
  resolveReport,
} from "../controllers/moderation-controller.js";

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
