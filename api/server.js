const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const usersRoute = require('./users/usersRoute')
const authRoute = require('./auth/auth-router');
const { restricted } = require('./auth/auth-middleware');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/auth', authRoute)
server.use('/api/users', restricted, usersRoute)

server.use('*', (err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        bonus: "server - somethin ain't right",
        message: err.message,
        stack: err.stack,
    })
})

module.exports = server;