// Import libraries and utilities
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// Set port to 4000 by default. React will use 3000 by default.
const port = process.env.PORT || 4000;

// Initialize server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// io.on("connection", (socket) => {
    
// });

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});