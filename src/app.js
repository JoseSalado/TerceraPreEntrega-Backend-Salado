import { Server } from "socket.io";
import app from "./index.js";
import config from "./config/index.js";
import MessageManager from "./dao/mongo/messages.mongo.js";

const {port} = config.port

const httpServer = app.listen(port, () => {
    console.log(`server running at port ${port}`);
})

const io = new Server(httpServer)

const Message = new MessageManager()

io.on('connection', socket => {
    console.log(`user connected: ${socket.id}`);

    socket.on('message', async data => {
        await Message.create(data)
        io.emit('messageLogs', await Message.get())    
    })
})