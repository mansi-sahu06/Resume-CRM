import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

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

// Connect to database on first request
let dbConnected = false;
const initDB = async () => {
  if (!dbConnected && process.env.MONGO_URI) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error("Database connection error:", error);
    }
  }
};

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
app.get("/api/health", async (req, res) => {
  await initDB();
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    dbConnected 
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Export for Vercel
export default app;
