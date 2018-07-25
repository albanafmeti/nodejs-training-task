let express = require('express');
let CommandController = require('../controllers/CommandController');

function getRouter(socket) {

    var router = express.Router();

    router.get('/:clientId', CommandController.getCommands);
    router.post('/create', function (request, response) {
        return CommandController.create(request, response, socket);
    });

    return router;
}

module.exports = getRouter;