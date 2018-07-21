let express = require('express');
let Action = require('../models/action');
let User = require('../models/user');
let Helpers = require('../helpers');

function getRouter(socket_io) {

    var router = express.Router();

    // Get messages route.
    router.get('/:client_id', function (request, response) {

        const auth_token = request.query._token;

        User.getAuthenticatedUser(auth_token, (err, user) => {
            if (err) {
                return Helpers.jsonResponse(response, false, { messages: [] }, 'Something went wrong.');
            }

            if (!user) {
                return Helpers.jsonResponse(response, false, { messages: [] }, 'You are not authorized.');
            }

            let condition = {};
            if (user.is_admin) {
                const client_id = request.params.client_id;
                condition = {
                    type: 'Message', $or: [
                        { $and: [{ 'user_id': user._id }, { 'dest_user_id': client_id }] },
                        { $and: [{ 'user_id': client_id }, { 'dest_user_id': user._id }] }
                    ]
                };
            } else {
                condition = { type: 'Message', $or: [{ 'user_id': user._id }, { 'dest_user_id': user._id }] };
            }

            // Get list of actions
            Action.find(condition, function (err, messages) {

                if (err) {
                    return Helpers.jsonResponse(response, false, { messages: [] }, 'Something went wrong.');
                }

                return Helpers.jsonResponse(response, true, { messages: messages }, 'Success.');
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
                type: 'Message',
                content: data.message,
                user_id: user._id,
                dest_user_id: data.dest_user_id,
                by_admin: user.is_admin ? true : false,
                created_at: new Date()
            }, function (err, message) {
                if (err) {
                    return Helpers.jsonResponse(response, false, null, 'Something went wrong.');
                }

                socket_io.broadcast.emit('new_message');
                user.updateLastActionAt((err, result) => { });
                return Helpers.jsonResponse(response, true, { message: message }, 'Message sent successfully.');
            });
        });
    });

    return router;
}

module.exports = getRouter;