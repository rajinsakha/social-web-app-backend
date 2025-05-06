import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  organizerType: {
    type: String,
    enum: ["User", "College", "Business"],
    required: true,
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "organizerType",
  },
  type: {
    type: String,
    enum: ["academic", "social", "business"],
    required: true,
  },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
