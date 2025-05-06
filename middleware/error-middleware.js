import { validationResult } from "express-validator";

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;
  let errors;

  // Handle validation errors
  if (err.name === "ValidationError") {
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  } else if (err.errors && Array.isArray(err.errors)) {
    errors = err.errors;
  }

  // Handle mongoose duplicate key error
  if (err.code === 11000) {
    message = "Duplicate field value entered";
    errors = [
      {
        field: Object.keys(err.keyValue)[0],
        message: `This ${Object.keys(err.keyValue)[0]} already exists`,
      },
    ];
  }

  res.status(statusCode).json({
    message,
    errors,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));

    res.status(400);
    throw new Error({
      message: "Validation failed",
      errors: extractedErrors,
    });
  };
};

export { notFound, errorHandler, validate };
