let express = require('express');
let MessageController = require('../controllers/MessageController');

function getRouter(socket) {

    var router = express.Router();

    router.get('/:clientId', MessageController.getMessages);
    router.post('/create', function (request, response) {
        return MessageController.create(request, response, socket);
    });

    return router;
}

module.exports = getRouter;