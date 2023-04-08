import mongoose from "mongoose";
import config from "./config.js";
import logger from "../utils/logger.js";

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGO_URI, (err) => {
  if (err) {
    logger.error(err);
  } else {
    console.log("Conectado exitosamente a la DB 🚀");
  }
});
