import { Server } from "socket.io";
import httpServer from "./app.js";
import MessageManager from "./dao/message.manager.js";

const io = new Server(httpServer)

const Message = new MessageManager()

io.on('connection', socket => {
    console.log(`user connected: ${socket.id}`);

    socket.on('message', async data => {
        await Message.create(data)
        io.emit('messageLogs', await Message.get())    
    })
})