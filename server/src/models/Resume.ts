import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  fullName: string;
  email: string;
  phone: string;
  skills: string[];
  category: "Digital Marketing" | "Cyber Security" | "Full Stack Development";
  experience: number;
  currentCompany?: string;
  expectedSalary?: number;
  location?: string;
  resumeFile: string;
  notes?: string;
  status: "New" | "Shortlisted" | "Rejected" | "Called" | "Interview" | "Selected";
  createdAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    skills: [{ type: String }],
    category: {
      type: String,
      enum: ["Digital Marketing", "Cyber Security", "Full Stack Development"],
      required: true,
    },
    experience: { type: Number, required: true },
    currentCompany: String,
    expectedSalary: Number,
    location: String,

    resumeUrl: { type: String, required: false },

    notes: String,
    status: {
      type: String,
      enum: ["New", "Shortlisted", "Rejected", "Called", "Interview", "Selected"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IResume>("Resume", ResumeSchema);
