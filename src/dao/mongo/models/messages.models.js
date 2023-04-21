import mongoose from "mongoose";

const messagesCollection = 'messages';

const messageSchema = mongoose.Schema({
    user: String,
    message: String
})

const Messages = mongoose.model(messagesCollection, messageSchema)

export default Messages