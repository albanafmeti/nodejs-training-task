let Action = require('../models/action');
let User = require('../models/user');
let Helpers = require('../helpers');
let Controller = require('./Controller');

class ActionController extends Controller {

    /**
     * Get list of actions.
     */
    getActions(request, response) {

        super.authorize(request, response, (user) => {

            let condition = {};
            if (!user.is_admin) {
                condition = { $or: [{ 'user': user._id }, { 'destination_user': user._id }] };
            }

            Action.find(condition).populate('user').exec(function (err, actions) {

                if (err) {
                    return Helpers.jsonResponse(response, false, { actions: [] }, 'Something went wrong.');
                }

                return Helpers.jsonResponse(response, true, { actions: actions }, 'Success.');
            });
        });
    }
}

module.exports = new ActionController();