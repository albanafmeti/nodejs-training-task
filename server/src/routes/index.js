let express = require('express');
var router = express.Router();

function getRouter(socket_io) {
    const authRoutes = require('./auth');
    const actionsRoutes = require('./actions');
    const messagesRoutes = require('./messages')(socket_io);
    const usersRoutes = require('./users');
    const statisticsRoutes = require('./statistics')(socket_io);

    router.use('/auth', authRoutes);
    router.use('/actions', actionsRoutes);
    router.use('/messages', messagesRoutes);
    router.use('/users', usersRoutes);
    router.use('/statistics', statisticsRoutes);
    return router;
}

module.exports = getRouter;