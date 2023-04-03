import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI,
  SECRET: process.env.SECRET,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  APP_ID: process.env.APP_ID,
  PERSISTENCIA: process.env.PERSISTENCIA || "mongodb",
};
