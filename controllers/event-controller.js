import asyncHandler from "express-async-handler";
import Event from "../models/Event.js";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const filter = type ? { type } : {};

  const events = await Event.find(filter)
    .populate("organizerId", "name avatar")
    .populate("attendees", "name avatar");

  res.json(events);
});

// @desc    RSVP to event
// @route   PUT /api/events/:id/rsvp
// @access  Private
const rsvpToEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { attendees: req.user.id } },
    { new: true }
  );

  res.json(event);
});

// @desc    Create event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  let organizerType;
  if (req.user.role === "college") organizerType = "College";
  else if (req.user.role === "business") organizerType = "Business";
  else organizerType = "User";

  const event = await Event.create({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    organizerType,
    organizerId: req.user.id,
    type: req.body.type,
  });

  res.status(201).json(event);
});

export { getEvents, rsvpToEvent, createEvent };
