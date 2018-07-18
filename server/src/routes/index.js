let express = require('express');
var router = express.Router();

function getRouter(socket_io) {
    const authRoutes = require('./auth');
    const actionsRoutes = require('./actions');
    const messagesRoutes = require('./messages')(socket_io);
    const usersRoutes = require('./users');

    router.use('/auth', authRoutes);
    router.use('/actions', actionsRoutes);
    router.use('/messages', messagesRoutes);
    router.use('/users', usersRoutes);
    return router;
}

module.exports = getRouter;