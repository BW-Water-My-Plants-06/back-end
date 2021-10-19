
const express = require("express");
const cors = require("cors");

const server = express();

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const plantsRouter = require("./plants/plants-router");

server.use(express.json());
server.use(cors());

server.use("/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/plants", plantsRouter);

server.get('/api', (req, res) => {
    res.json(`Welcome to the app`)
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;