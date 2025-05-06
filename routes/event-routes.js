import express from "express";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/error.js";
import { eventValidation } from "../middleware/validation.js";
import {
  getEvents,
  rsvpToEvent,
  createEvent,
} from "../controllers/event-controller.js";

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
