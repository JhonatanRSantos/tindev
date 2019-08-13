import express from "express";
import mongoose from "mongoose";
import routes from "./router/router";
import dotenv from "dotenv";
import cors from "cors";
import io from "socket.io";

dotenv.config();
const app = express();
const server = require("http").Server(app);
const socketIO = io(server);

const connectedUsers = {};
socketIO.on("connection", socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
    socket.on("disconnect", () => {
        delete connectedUsers[user];        
    });
});

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser : true 
});

app.use((req, res, next) => {
    req.socketIO = socketIO;
    req.connectedUsers = connectedUsers;
    return next();
});
app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(process.env.SERVER_PORT,
    () => console.log(`Server started with success on port ${process.env.SERVER_PORT}!`) );