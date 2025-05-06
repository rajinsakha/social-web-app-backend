import asyncHandler from "express-async-handler";
import Business from "../models/Business.js";
import Event from "../models/Event.js";

// @desc    Create business profile
// @route   POST /api/businesses
// @access  Private/Business
const createBusinessProfile = asyncHandler(async (req, res) => {
  if (req.user.role !== "business") {
    res.status(403);
    throw new Error("Not authorized as business");
  }

  const business = await Business.create({
    owner: req.user.id,
    ...req.body,
  });

  res.status(201).json(business);
});

// @desc    Add business review
// @route   POST /api/businesses/:id/reviews
// @access  Private
const addBusinessReview = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id);
  if (!business) {
    res.status(404);
    throw new Error("Business not found");
  }

  const review = {
    user: req.user.id,
    rating: req.body.rating,
    comment: req.body.comment,
  };

  business.reviews.push(review);
  await business.save();

  res.status(201).json(business.reviews);
});

// @desc    Create business event
// @route   POST /api/businesses/:id/events
// @access  Private/Business
const createBusinessEvent = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id);
  if (!business || business.owner.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  const event = await Event.create({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    organizerType: "Business",
    organizerId: business._id,
    type: "business",
  });

  business.events.push(event._id);
  await business.save();

  res.status(201).json(event);
});

export { createBusinessProfile, addBusinessReview, createBusinessEvent };
