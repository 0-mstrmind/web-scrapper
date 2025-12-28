import mongoose from "mongoose";
import { dbURL } from "../utils/constants";

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.log("Failed to connect with database", error);
  }
}