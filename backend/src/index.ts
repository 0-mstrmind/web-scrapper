import express from "express";
import type { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { port } from "./utils/constants";
import { ApiError } from "./utils/ApiError";
import { connectDB } from "./db/connectDB";

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ limit: "4kb" }));

  connectDB();
  
  app.get("/", (req: Request, res: Response) => {
    return "Hi! Welcome to the app...";
  });
  
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        success: err.success,
        message: err.message,
        errors: err.errors,
      });
    }
    
    console.error(err);
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is running at: ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server: ", error);
});