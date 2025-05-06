import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("-password")
    .populate("courses resources");
  res.json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: req.body },
    { new: true, runValidators: true }
  ).select("-password");

  res.json(user);
});

// @desc    Add course (College only)
// @route   POST /api/users/courses
// @access  Private/College
const addCourse = asyncHandler(async (req, res) => {
  if (req.user.role !== "college") {
    res.status(403);
    throw new Error("Not authorized as college");
  }

  const course = {
    title: req.body.title,
    description: req.body.description,
    enrollmentProcedure: req.body.enrollmentProcedure,
    deadlines: req.body.deadlines,
    benefits: req.body.benefits,
  };

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { courses: course } },
    { new: true }
  ).select("-password");

  res.status(201).json(user.courses);
});

// @desc    Upgrade to premium
// @route   PUT /api/users/premium
// @access  Private
const upgradeToPremium = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { isPremium: true },
    { new: true }
  ).select("-password");

  res.json(user);
});

export { getUserProfile, updateUserProfile, addCourse, upgradeToPremium };
