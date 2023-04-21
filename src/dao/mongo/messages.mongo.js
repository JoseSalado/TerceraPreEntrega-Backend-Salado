import Messages from "./models/messages.models.js";

class MessageManager {
  async get() {
    try {
        const messages = await Messages.find();
        return messages
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
        const message = await Messages.create(data);
        return message;
    } catch (error) {
      console.log(error);
    }
  }
}

export default MessageManager