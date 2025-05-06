import asyncHandler from "express-async-handler";
import Report from "../models/Report.js";

// @desc    Create report
// @route   POST /api/reports
// @access  Private
const createReport = asyncHandler(async (req, res) => {
  const { contentType, contentId, reason } = req.body;

  // Check if content exists
  let model;
  try {
    model = await mongoose.model(contentType).findById(contentId);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid content type");
  }

  if (!model) {
    res.status(404);
    throw new Error("Content not found");
  }

  const report = await Report.create({
    reporter: req.user.id,
    contentType,
    contentId,
    reason,
  });

  res.status(201).json(report);
});

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private/Admin
const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find()
    .populate("reporter", "name email")
    .populate("contentId");

  res.json(reports);
});

// @desc    Resolve report
// @route   PUT /api/reports/:id/resolve
// @access  Private/Admin
const resolveReport = asyncHandler(async (req, res) => {
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { status: "resolved" },
    { new: true }
  );

  res.json(report);
});

export { createReport, getReports, resolveReport };
