"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const Admin_1 = __importDefault(require("../models/Admin"));
dotenv_1.default.config();
const createAdmin = async () => {
    try {
        await (0, db_1.default)();
        const email = "admin@example.com";
        const password = "admin123";
        const existingAdmin = await Admin_1.default.findOne({ email });
        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit();
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await Admin_1.default.create({
            email,
            password: hashedPassword,
        });
        console.log("Admin created successfully");
        process.exit();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
createAdmin();
//# sourceMappingURL=createAdmin.js.map