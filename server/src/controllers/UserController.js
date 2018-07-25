let User = require('../models/user');
let Helpers = require('../helpers');
let Controller = require('./Controller');

class UserController extends Controller {

    /**
     * Get list of clients.
     */
    getClients(request, response) {

        super.authorize(request, response, (user) => {

            User.find({ is_admin: false }, function (err, clients) {

                if (err) {
                    return Helpers.jsonResponse(response, false, { clients: [] }, 'Something went wrong.');
                }

                return Helpers.jsonResponse(response, true, { clients: clients }, 'Success.');
            });
        });
    }

    /**
     * Get admin.
     */
    getAdmin(request, response) {

        super.authorize(request, response, (user) => {

            User.findOne({ is_admin: true }, function (err, admin) {

                if (err) {
                    return Helpers.jsonResponse(response, false, { admin: [] }, 'Something went wrong.');
                }

                return Helpers.jsonResponse(response, true, { admin: admin }, 'Success.');
            });
        });
    }
}

module.exports = new UserController;