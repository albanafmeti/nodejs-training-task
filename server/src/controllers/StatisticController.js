let Action = require('../models/action');
let User = require('../models/user');
let Helpers = require('../helpers');
let Controller = require('./Controller');

class StatisticController extends Controller {

    /**
     * Create new statistic.
     */
    create(request, response, socket) {
        const data = request.body;

        super.authorize(request, response, (user) => {

            Action.create({
                type: 'Statistics',
                content: data.eventData,
                user: user._id,
                created_at: new Date()
            }, function (err, statistic) {
                if (err) {
                    return Helpers.jsonResponse(response, false, null, 'Something went wrong.');
                }

                socket.broadcast.emit('new_statistic');
                user.updateLastActionAt((err, result) => { });
                return Helpers.jsonResponse(response, true, { statistic: statistic }, 'Event sent successfully.');
            });
        });
    }
}

module.exports = new StatisticController;