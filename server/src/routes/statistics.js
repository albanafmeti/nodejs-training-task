let express = require('express');
let StatisticController = require('../controllers/StatisticController');

function getRouter(socket) {

    var router = express.Router();

    router.post('/create', function (request, response) {
        return StatisticController.create(request, response, socket);
    });

    return router;
}

module.exports = getRouter;