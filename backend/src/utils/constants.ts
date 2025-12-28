import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 3030;
export const dbURL = process.env.DB_URL as string;