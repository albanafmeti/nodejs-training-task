let express = require('express');
var router = express.Router();

function getRouter(socket) {
    const authRoutes = require('./auth');
    const actionsRoutes = require('./actions');
    const messagesRoutes = require('./messages')(socket);
    const usersRoutes = require('./users');
    const statisticsRoutes = require('./statistics')(socket);
    const commandsRoutes = require('./commands')(socket);

    router.use('/auth', authRoutes);
    router.use('/actions', actionsRoutes);
    router.use('/messages', messagesRoutes);
    router.use('/users', usersRoutes);
    router.use('/statistics', statisticsRoutes);
    router.use('/commands', commandsRoutes);
    return router;
}

module.exports = getRouter;