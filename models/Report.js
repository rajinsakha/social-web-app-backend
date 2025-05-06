import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contentType: {
    type: String,
    enum: ["Post", "Comment", "User", "Business", "Event", "Group"],
    required: true,
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "contentType",
  },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "under_review", "resolved"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);
export default Report;
