"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("../src/config/db"));
const authRoutes_1 = __importDefault(require("../src/routes/authRoutes"));
const resumeRoutes_1 = __importDefault(require("../src/routes/resumeRoutes"));
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static files for uploads
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Connect to database on first request
let dbConnected = false;
const initDB = async () => {
    if (!dbConnected && process.env.MONGO_URI) {
        try {
            await (0, db_1.default)();
            dbConnected = true;
        }
        catch (error) {
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
app.use("/api/auth", authRoutes_1.default);
app.use("/api/resumes", resumeRoutes_1.default);
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
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
});
// Export for Vercel
exports.default = app;
//# sourceMappingURL=index.js.map