"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const resumeRoutes_1 = __importDefault(require("./routes/resumeRoutes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.get("/", (req, res) => {
    res.send("Resume CRM API is running...");
});
app.get("/api/test", authMiddleware_1.protect, (req, res) => {
    res.json({ message: "Protected route working" });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/resumes", resumeRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map