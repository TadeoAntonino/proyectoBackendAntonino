import mongoose from "mongoose";
import config from "./config.js";

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGO_URI, (err) => {
  if (err) {
    console.log(`Error: ${err} 🛑`);
  } else {
    console.log("Conectado exitosamente a la DB 🚀");
  }
});
