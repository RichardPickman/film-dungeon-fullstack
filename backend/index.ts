import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import router from "./router";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log('Connected!')
});

app.use('/api', router)

httpServer.listen(3000, () => console.log(`Server started on port 3000`));
