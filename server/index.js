// Import libraries and utilities
const express = require("express");
const http = require("http");
// const socketIo = require("socket.io");
const { Server } = require("socket.io");
const cors = require("cors");

// Set port to 4000 by default. React will use 3000 by default.
const port = process.env.PORT || 4000;

let environment;

if (process.env.NODE_ENV === 'production') {
    environment = 'https://oui-tube.vercel.app/'
} else {
    environment = 'http://localhost:3000'
}

// Initialize server
const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', environment);

    res.setHeader('Access-Control-Allow-Origin', 'https://oui-tube-backend.vercel.app/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: environment,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    // console.log(socket.id);

    // Join room, passing in data received from emit in App.js
    socket.on("joinRoom", (data) => {
        // console.log(`${data[0]} joined the room.`);
        socket.join(data[1]);
        socket.to(data[1]).emit("receiveUser", {
            author: 'System',
            message: `${data[0]} has joined the room.`,
            time: ''
        });
    });

    socket.on("sendMessage", (message) => {
        // console.log(message);
        socket.to(message.room).emit("receiveMessages", message);
    });

    socket.on("setVideo", (video) => {
        // console.log(video);
        socket.to(video[1]).emit("receiveVideo", video);
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});