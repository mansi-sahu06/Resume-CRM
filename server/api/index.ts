import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import connectDB from "../src/config/db";
import authRoutes from "../src/routes/authRoutes";
import resumeRoutes from "../src/routes/resumeRoutes";

dotenv.config();

// Initialize Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Connect to database
connectDB().catch((error) => {
  console.error("Database connection error:", error);
});

// Routes
app.get("/", (req, res) => {
  res.send("Resume CRM API is running...");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Protected route working" });
});

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Vercel serverless handler
export default app;

// For vercel compatible handler
export const handler = app;
