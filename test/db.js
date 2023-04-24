import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default async function mongoDB() {
  try {
    mongoose.connect(
      "mongodb+srv://tadeoAntonino:coderhouse123@coderhousetadeo32220.a8ibyip.mongodb.net/test"
    );
    console.log("Conectado a la base de testing");
  } catch (error) {
    console.log("🛑 ERROR:", error);
  }
}
