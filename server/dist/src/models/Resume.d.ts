import mongoose, { Document } from "mongoose";
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
declare const _default: mongoose.Model<IResume, {}, {}, {}, mongoose.Document<unknown, {}, IResume, {}, mongoose.DefaultSchemaOptions> & IResume & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IResume>;
export default _default;
//# sourceMappingURL=Resume.d.ts.map