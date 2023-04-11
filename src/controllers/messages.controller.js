import MessagesService from "../services/messages.service.js";
import { STATUS } from "../constants/constants.js";

/* Instancia */

const messageServiceInstance = new MessagesService();
const messageService = messageServiceInstance;

class MessagesController {
  async getMessages(req, res) {
    try {
      const response = await messageService.getMessages();
      res.json({
        message: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  }

  async addMessages(req, res) {
    try {
      const { body } = req;
      const response = await messageService.addMessages(body);
      res.json({
        message: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  }
}

export default MessagesController;
