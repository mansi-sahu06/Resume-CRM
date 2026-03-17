import { Request, Response } from "express";
import fs from "fs";
import pdf from "pdf-parse";

export const parseResume = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Resume required" });
    }

    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdf(dataBuffer);
    const text = pdfData.text;

    // VERY BASIC extraction (you can improve later)
    const emailMatch = text.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
    );

    const phoneMatch = text.match(
      /(\+?\d{1,3}[- ]?)?\d{10}/
    );

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

    skillKeywords.forEach(skill => {
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

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Parsing failed" });
  }
};