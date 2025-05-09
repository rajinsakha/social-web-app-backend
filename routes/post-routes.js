import express from "express";
import { protect } from "../middleware/auth-middleware.js";
import { validate } from "../middleware/error-middleware.js";
import { postValidation } from "../middleware/validation-middleware.js";
import {
  createPost,
  deletePost,
  likePost,
  commentOnPost,
} from "../controllers/post-controller.js";
import { check } from "express-validator";

const router = express.Router();

router.post("/", protect, validate(postValidation), createPost);

router.delete(
  "/:id",
  protect,
  check("id", "Invalid post ID").isMongoId(),
  validate,
  deletePost
);

router.post(
  "/:id/like",
  protect,
  check("id", "Invalid post ID").isMongoId(),
  validate,
  likePost
);

router.post(
  "/:id/comments",
  protect,
  check("id", "Invalid post ID").isMongoId(),
  validate(postValidation),
  commentOnPost
);

export default router;
