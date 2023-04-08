import { Router } from "express";
import logger from "../utils/logger.js";

class LoggerTest {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/loggerTest", (req, res) => {
      logger.fatal("Este es un mensaje fatal");
      logger.error("Este es un mensaje de error");
      logger.warning("Este es un mensaje de warning");
      logger.info("Este es un mensaje de info");
      logger.http("Este es un mensaje de solicitud HTTP");
      logger.debug("Este es un mensaje de debug");
      res.send("Estos son ejemplos de loggers 😀");
    });
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new LoggerTest();
