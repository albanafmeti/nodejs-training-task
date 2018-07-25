let Action = require('../models/action');
let User = require('../models/user');
let Helpers = require('../helpers');
let Controller = require('./Controller');

class MessageController extends Controller {

    /**
     * Get list of messages.
     */
    getMessages(request, response) {

        super.authorize(request, response, (user) => {

            let condition = {};
            if (user.is_admin) {

                const clientId = request.params.clientId;

                condition = {
                    type: 'Message', $or: [
                        { $and: [{ 'user': user._id }, { 'destination_user': clientId }] },
                        { $and: [{ 'user': clientId }, { 'destination_user': user._id }] }
                    ]
                };
            } else {
                condition = { type: 'Message', $or: [{ 'user': user._id }, { 'destination_user': user._id }] };
            }

            Action.find(condition, function (err, messages) {

                if (err) {
                    return Helpers.jsonResponse(response, false, { messages: [] }, 'Something went wrong.');
                }

                return Helpers.jsonResponse(response, true, { messages: messages }, 'Success.');
            });
        });
    }

    /**
     * Create new message.
     */
    create(request, response, socket) {
        const data = request.body;

        super.authorize(request, response, (user) => {

            Action.create({
                type: 'Message',
                content: data.message,
                user: user._id,
                destination_user: data.dest_user_id,
                by_admin: user.is_admin ? true : false,
                created_at: new Date()
            }, function (err, message) {
                if (err) {
                    return Helpers.jsonResponse(response, false, null, 'Something went wrong.');
                }

                socket.broadcast.emit('new_message');
                user.updateLastActionAt((err, result) => { });
                return Helpers.jsonResponse(response, true, { message: message }, 'Message sent successfully.');
            });
        });
    }
}

module.exports = new MessageController;