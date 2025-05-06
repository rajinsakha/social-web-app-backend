import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "college", "business", "admin"],
    default: "student",
  },
  avatar: String,
  bio: String,
  academicInterests: [String],
  hobbies: [String],
  courses: [
    {
      title: String,
      description: String,
      enrollmentProcedure: String,
      deadlines: Date,
      benefits: String,
    },
  ],
  resources: [
    {
      title: String,
      description: String,
      fileUrl: String,
    },
  ],
  isPremium: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
