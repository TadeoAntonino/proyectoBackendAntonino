import { MessagesModel } from "../dao/models/messages.models";

export async function getMessages() {
  try {
    const messages = await MessagesModel.find();
    return messages;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addMessages(name, message) {
  try {
    const _message = await MessagesModel.create(name, message);
    return _message;
  } catch (error) {
    throw new Error(error.message);
  }
}
