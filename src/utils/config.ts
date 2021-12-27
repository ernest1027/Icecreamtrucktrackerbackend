import * as dotenv from 'dotenv'
dotenv.config();
// Export .env variables

export const MONGOURL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/locationapi"
export const PORT = process.env.PORT || 8000







