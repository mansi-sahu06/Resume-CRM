"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getDashboardStats = exports.deleteResume = exports.updateResume = exports.getResumeById = exports.getResumes = exports.createResume = void 0;
const Resume_1 = __importDefault(require("../models/Resume"));
const createResume = async (req, res) => {
    try {
        const { fullName, email, phone, skills, category, experience, currentCompany, expectedSalary, location, status, notes, } = req.body;
        const skillsArray = skills
            ? skills.toString().split(",").map((skill) => skill.trim())
            : [];
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Resume PDF required" });
        }
        const newResume = await Resume_1.default.create({
            fullName,
            email,
            phone,
            skills: skillsArray,
            category,
            experience: Number(experience),
            currentCompany,
            expectedSalary: expectedSalary ? Number(expectedSalary) : undefined,
            location,
            status: status === "" || status === undefined || status === "undefined" ? "New" : status,
            notes,
            resumeFile: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        });
        res.status(201).json(newResume);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createResume = createResume;
const getResumes = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const { search, category, status } = req.query;
        let query = {};
        if (search) {
            query.fullName = { $regex: search, $options: "i" };
        }
        if (category) {
            query.category = category;
        }
        if (status) {
            query.status = status;
        }
        const resumes = await Resume_1.default.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const total = await Resume_1.default.countDocuments(query);
        res.json({
            resumes,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalResumes: total,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getResumes = getResumes;
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume_1.default.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.json(resume);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getResumeById = getResumeById;
const updateResume = async (req, res) => {
    try {
        const { fullName, email, phone, skills, category, experience, currentCompany, expectedSalary, location, status, notes, } = req.body;
        const resume = await Resume_1.default.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        if (skills) {
            resume.skills = Array.isArray(skills)
                ? skills
                : skills.split(",").map((s) => s.trim());
        }
        resume.fullName = fullName || resume.fullName;
        resume.email = email || resume.email;
        resume.phone = phone || resume.phone;
        resume.category = category || resume.category;
        resume.experience = experience ? Number(experience) : resume.experience;
        resume.currentCompany = currentCompany || resume.currentCompany;
        resume.expectedSalary = expectedSalary
            ? Number(expectedSalary)
            : resume.expectedSalary;
        resume.location = location || resume.location;
        resume.status = status || resume.status;
        resume.notes = notes || resume.notes;
        await resume.save();
        res.json(resume);
    }
    catch (error) {
        console.log("UPDATE ERROR:", error);
        res.status(500).json({
            message: "Update error",
            error: error.message,
        });
    }
};
exports.updateResume = updateResume;
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume_1.default.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        await resume.deleteOne();
        res.json({ message: "Resume deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteResume = deleteResume;
const getDashboardStats = async (req, res) => {
    try {
        const totalResumes = await Resume_1.default.countDocuments();
        const digitalMarketing = await Resume_1.default.countDocuments({
            category: "Digital Marketing",
        });
        const cyberSecurity = await Resume_1.default.countDocuments({
            category: "Cyber Security",
        });
        const fullStack = await Resume_1.default.countDocuments({
            category: "Full Stack Development",
        });
        const shortlisted = await Resume_1.default.countDocuments({
            status: "Shortlisted",
        });
        res.json({
            totalResumes,
            digitalMarketing,
            cyberSecurity,
            fullStack,
            shortlisted,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getDashboardStats = getDashboardStats;
const updateStatus = async (req, res) => {
    try {
        console.log("PATCH HIT:", req.params.id);
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }
        const resume = await Resume_1.default.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        resume.status = status;
        await resume.save();
        res.json({
            success: true,
            data: resume,
        });
    }
    catch (error) {
        console.log("UPDATE STATUS ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateStatus = updateStatus;
//# sourceMappingURL=resumeController.js.map