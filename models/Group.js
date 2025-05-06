import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: {
    type: String,
    enum: ["study", "lifestyle", "interest"],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  createdAt: { type: Date, default: Date.now },
});

const Group = mongoose.model("Group", groupSchema);
export default Group;
