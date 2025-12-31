import dotenv from "dotenv";

dotenv.config({path: "../../.env"});

export const port = process.env.PORT || 3030;
export const dbURL = process.env.DB_URL as string;
export const frontendURL = process.env.FRONTEND_BASE_URL as string;

// for google search
export const googleAPIKey = process.env.GOOGLE_API_KEY as string;
export const googleCxKey = process.env.GOOGLE_CX_KEY as string;

// open api key
export const openaiAPIKey = process.env.OPENAI_API_KEY as string;