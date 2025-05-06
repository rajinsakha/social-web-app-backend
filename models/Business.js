import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: String,
  menu: [
    {
      itemName: String,
      description: String,
      price: Number,
    },
  ],
  offers: [
    {
      title: String,
      description: String,
      discount: String,
      validUntil: Date,
    },
  ],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Business = mongoose.model("Business", businessSchema);
export default Business;
