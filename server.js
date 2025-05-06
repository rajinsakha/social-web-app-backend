import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import groupRoutes from "./routes/group-routes.js";
import businessRoutes from "./routes/business-routes.js";
import eventRoutes from "./routes/event-routes.js";
import moderationRoutes from "./routes/moderation-routes.js";
import { notFound, errorHandler } from "./middleware/error-middleware.js";
import postRoutes from "./routes/post-routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/moderation", moderationRoutes);
app.use("/api/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
