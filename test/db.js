import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default async function mongoDB() {
  try {
    mongoose.connect(process.env.MONGO_URI_TEST);
    console.log("Conectado a la base de testing");
  } catch (error) {
    throw new Error(error);
  }
}
