import { check, body } from "express-validator";

export const registerValidation = [
  check("name", "Name is required").trim().notEmpty(),
  check("email", "Please include a valid email").isEmail().normalizeEmail(),
  check("password", "Password must be 6+ characters").isLength({ min: 6 }),
  check("role", "Invalid role")
    .optional()
    .isIn(["student", "college", "business", "admin"]),
];

export const loginValidation = [
  check("email", "Please include a valid email").isEmail().normalizeEmail(),
  check("password", "Password is required").exists(),
];

export const userUpdateValidation = [
  check("name", "Name is required").optional().trim().notEmpty(),
  check("bio", "Bio must be less than 500 characters")
    .optional()
    .isLength({ max: 500 }),
  check("academicInterests").optional().isArray(),
  check("hobbies").optional().isArray(),
];

export const courseValidation = [
  check("title", "Title is required").trim().notEmpty(),
  check("description", "Description is required").trim().notEmpty(),
  check("enrollmentProcedure", "Enrollment procedure is required")
    .trim()
    .notEmpty(),
  check("deadlines", "Valid deadline date required").isISO8601(),
];

export const groupValidation = [
  check("name", "Group name is required").trim().notEmpty(),
  check("description", "Description must be less than 500 characters")
    .optional()
    .isLength({ max: 500 }),
  check("type", "Invalid group type").isIn(["study", "lifestyle", "interest"]),
];

export const postValidation = [
  check("content", "Content is required").trim().notEmpty(),
  check("content", "Content must be less than 2000 characters").isLength({
    max: 2000,
  }),
];

export const businessValidation = [
  check("name", "Business name is required").trim().notEmpty(),
  check("description", "Description must be less than 1000 characters")
    .optional()
    .isLength({ max: 1000 }),
  check("address", "Address is required").trim().notEmpty(),
];

export const menuItemValidation = [
  check("itemName", "Item name is required").trim().notEmpty(),
  check("price", "Valid price required").isFloat({ min: 0 }),
];

export const offerValidation = [
  check("title", "Title is required").trim().notEmpty(),
  check("description", "Description is required").trim().notEmpty(),
  check("discount", "Discount description is required").trim().notEmpty(),
  check("validUntil", "Valid expiration date required").isISO8601(),
];

export const reviewValidation = [
  check("rating", "Rating between 1-5 required").isInt({ min: 1, max: 5 }),
  check("comment", "Comment must be less than 500 characters")
    .optional()
    .isLength({ max: 500 }),
];

export const eventValidation = [
  check("title", "Title is required").trim().notEmpty(),
  check("description", "Description must be less than 1000 characters")
    .optional()
    .isLength({ max: 1000 }),
  check("date", "Valid date required").isISO8601(),
  check("location", "Location is required").trim().notEmpty(),
  check("type", "Invalid event type").isIn(["academic", "social", "business"]),
];

export const reportValidation = [
  check("contentType", "Invalid content type").isIn([
    "Post",
    "Comment",
    "User",
    "Business",
    "Event",
    "Group",
  ]),
  check("contentId", "Invalid content ID").isMongoId(),
  check("reason", "Reason must be less than 500 characters").isLength({
    max: 500,
  }),
];
