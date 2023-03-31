import express from "express"
import cors from "cors"
// import { fileURLToPath } from 'url';

const app = express()
app.use(cors())
// import path from 'path';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use(express.json())

const server = app.listen(3879,()=>console.log("server is running on 3879 port")) 
import { Server } from "socket.io";
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});



io.on("connection", (socket) => {
    console.log("connected");
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("call-User", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });
});



