import express from "express";
import { protect } from "../middleware/auth-middleware.js";
import { validate } from "../middleware/error-middleware.js";
import { eventValidation } from "../middleware/validation-middleware.js";
import {
  getEvents,
  rsvpToEvent,
  createEvent,
} from "../controllers/event-controller.js";
import { check } from "express-validator";

const router = express.Router();

router
  .route("/")
  .get(getEvents)
  .post(protect, validate(eventValidation), createEvent);

router.put(
  "/:id/rsvp",
  protect,
  check("id", "Invalid event ID").isMongoId(),
  validate,
  rsvpToEvent
);

export default router;
