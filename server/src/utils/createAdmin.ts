import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db";
import Admin from "../models/Admin";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const email = "admin@example.com";
    const password = "admin123";

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
