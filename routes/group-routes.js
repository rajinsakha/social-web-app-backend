import express from "express";
import { protect } from "../middleware/auth-middleware.js";
import { validate } from "../middleware/error-middleware.js";
import { groupValidation, postValidation } from "../middleware/validation-middleware.js";
import {
  createGroup,
  getGroups,
  joinGroup,
  createGroupPost,
} from "../controllers/group-controller.js";
import { check } from "express-validator";

const router = express.Router();

router
  .route("/")
  .post(protect, validate(groupValidation), createGroup)
  .get(getGroups);

router.put(
  "/:id/join",
  protect,
  check("id", "Invalid group ID").isMongoId(),
  validate,
  joinGroup
);

router.post(
  "/:id/posts",
  protect,
  check("id", "Invalid group ID").isMongoId(),
  validate(postValidation),
  createGroupPost
);

export default router;
