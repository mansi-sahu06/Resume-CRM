"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.warn("MONGO_URI environment variable not set");
            return;
        }
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        // Don't exit in serverless - just log the error
        throw error;
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map