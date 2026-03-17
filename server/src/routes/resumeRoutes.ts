import express from "express";
import { createResume, 
        getResumes,
        getResumeById,
        updateResume,
        deleteResume,
        getDashboardStats,
        updateStatus,
    } from "../controllers/resumeController";

import { protect } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post("/", protect, upload.single("resume"), createResume);
router.get("/stats", protect, getDashboardStats);
router.get("/", protect, getResumes);
router.patch("/:id/status", updateStatus);
router.get("/:id", getResumeById);
router.put("/:id", upload.single("resume"), updateResume);
router.delete("/:id", protect, deleteResume);

export default router;
