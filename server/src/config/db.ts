import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("MONGO_URI environment variable not set");
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Don't exit in serverless - just log the error
    throw error;
  }
};

export default connectDB;
