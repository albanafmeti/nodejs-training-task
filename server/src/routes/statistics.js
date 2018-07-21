let express = require('express');
let Action = require('../models/action');
let User = require('../models/user');
let Helpers = require('../helpers');

function getRouter(socket_io) {

    var router = express.Router();

    // Create new message route.
    router.post('/create', function (request, response) {

        const data = request.body;
        const auth_token = request.query._token;

        User.getAuthenticatedUser(auth_token, (err, user) => {
            if (err) {
                return Helpers.jsonResponse(response, false, null, 'Something went wrong.');
            }

            if (!user) {
                return Helpers.jsonResponse(response, false, null, 'You are not authorized.');
            }

            Action.create({
                type: 'Statistics',
                content: data.eventData,
                user_id: user._id,
                created_at: new Date()
            }, function (err, message) {
                if (err) {
                    return Helpers.jsonResponse(response, false, null, 'Something went wrong.');
                }

                socket_io.broadcast.emit('new_statistics');
                user.updateLastActionAt((err, result) => { });
                return Helpers.jsonResponse(response, true, { message: message }, 'Event sent successfully.');
            });
        });
    });

    return router;
}

module.exports = getRouter;