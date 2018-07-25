let Action = require('../models/action');
let User = require('../models/user');
let Helpers = require('../helpers');
let Controller = require('./Controller');

class CommandController extends Controller {

    /**
     * Get list of commands.
     */
    getCommands(request, response) {

        super.authorize(request, response, (user) => {

            const clientId = request.params.clientId;
            let condition = {
                type: 'Command', 'user': user._id, 'destination_user': clientId
            };

            Action.find(condition, function (err, commands) {

                if (err) {
                    return Helpers.jsonResponse(response, false, { commands: [] }, 'Something went wrong.');
                }

                return Helpers.jsonResponse(response, true, { commands: commands }, 'Success.');
            });
        });
    }

    /**
     * Create new command.
     */
    create(request, response, socket) {
        const data = request.body;

        super.authorize(request, response, (user) => {

            Action.create({
                type: 'Command',
                content: data.command,
                user: user._id,
                destination_user: data.dest_user_id,
                by_admin: user.is_admin ? true : false,
                created_at: new Date()
            }, function (err, command) {
                if (err) {
                    return Helpers.jsonResponse(response, false, null, 'Something went wrong.');
                }

                socket.broadcast.emit('new_command');
                user.updateLastActionAt((err, result) => { });
                return Helpers.jsonResponse(response, true, { command: command }, 'Command sent successfully.');
            });
        });
    }
}

module.exports = new CommandController;