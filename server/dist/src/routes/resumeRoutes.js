"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resumeController_1 = require("../controllers/resumeController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, uploadMiddleware_1.upload.single("resume"), resumeController_1.createResume);
router.get("/stats", authMiddleware_1.protect, resumeController_1.getDashboardStats);
router.get("/", authMiddleware_1.protect, resumeController_1.getResumes);
router.patch("/:id/status", resumeController_1.updateStatus);
router.get("/:id", resumeController_1.getResumeById);
router.put("/:id", uploadMiddleware_1.upload.single("resume"), resumeController_1.updateResume);
router.delete("/:id", authMiddleware_1.protect, resumeController_1.deleteResume);
exports.default = router;
//# sourceMappingURL=resumeRoutes.js.map