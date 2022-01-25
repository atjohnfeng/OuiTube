// Import libraries and utilities
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Set port to 4000 by default. React will use 3000 by default.
const port = process.env.PORT || 4000;

// Initialize server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    // console.log(socket.id);

    // Join room, passing in data received from emit in App.js
    socket.on("joinRoom", (data) => {
        // console.log(`${data[0]} joined the room.`);
        socket.join(data[1]);
    });

    socket.on("sendMessage", (message) => {
        // console.log(message);
        socket.to(message.room).emit("receiveMessages", message);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});