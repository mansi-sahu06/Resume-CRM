"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const Admin_1 = __importDefault(require("../models/Admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin_1.default.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.loginAdmin = loginAdmin;
//# sourceMappingURL=authController.js.map