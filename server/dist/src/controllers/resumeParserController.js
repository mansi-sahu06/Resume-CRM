"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResume = void 0;
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const parseResume = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Resume required" });
        }
        const dataBuffer = fs_1.default.readFileSync(file.path);
        const pdfData = await pdf_parse_1.default.default(dataBuffer);
        const text = pdfData.text;
        // VERY BASIC extraction (you can improve later)
        const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
        const phoneMatch = text.match(/(\+?\d{1,3}[- ]?)?\d{10}/);
        const skills = [];
        const skillKeywords = [
            "JavaScript",
            "React",
            "Node",
            "MongoDB",
            "Python",
            "Java",
            "HTML",
            "CSS"
        ];
        skillKeywords.forEach((skill) => {
            if (text.toLowerCase().includes(skill.toLowerCase())) {
                skills.push(skill);
            }
        });
        res.json({
            fullName: text.split("\n")[0], // first line assumption
            email: emailMatch ? emailMatch[0] : "",
            phone: phoneMatch ? phoneMatch[0] : "",
            skills,
            rawText: text,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Parsing failed" });
    }
};
exports.parseResume = parseResume;
//# sourceMappingURL=resumeParserController.js.map