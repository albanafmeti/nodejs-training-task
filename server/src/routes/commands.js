let express = require('express');
let Action = require('../models/action');
let User = require('../models/user');
let Helpers = require('../helpers');

function getRouter(socket_io) {

    var router = express.Router();

    // Get comamnds route.
    router.get('/:client_id', function (request, response) {

        const auth_token = request.query._token;

        User.getAuthenticatedUser(auth_token, (err, user) => {
            if (err) {
                return Helpers.jsonResponse(response, false, { commands: [] }, 'Something went wrong.');
            }

            if (!user || !user.is_admin) {
                return Helpers.jsonResponse(response, false, { commands: [] }, 'You are not authorized.');
            }

            const client_id = request.params.client_id;
            let condition = {
                type: 'Command', 'user_id': user._id, 'dest_user_id': client_id
            };

            // Get list of commands
            Action.find(condition, function (err, commands) {

                if (err) {
                    return Helpers.jsonResponse(response, false, { commands: [] }, 'Something went wrong.');
                }

                return Helpers.jsonResponse(response, true, { commands: commands }, 'Success.');
            });
        });
    });

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
                type: 'Command',
                content: data.command,
                user_id: user._id,
                dest_user_id: data.dest_user_id,
                by_admin: user.is_admin ? true : false,
                created_at: new Date()
            }, function (err, command) {
                if (err) {
                    return Helpers.jsonResponse(response, false, null, 'Something went wrong.');
                }

                socket_io.broadcast.emit('new_command');
                user.updateLastActionAt((err, result) => { });
                return Helpers.jsonResponse(response, true, { command: command }, 'Command sent successfully.');
            });
        });
    });

    return router;
}

module.exports = getRouter;