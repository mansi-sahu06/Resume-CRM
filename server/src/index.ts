import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import resumeRoutes from "./routes/resumeRoutes";
import { protect } from "./middlewares/authMiddleware";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("Resume CRM API is running...");
});

app.get("/api/test", protect, (req, res) => {
  res.json({ message: "Protected route working" });
});

app.use("/api/auth", authRoutes);

app.use("/api/resumes", resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
