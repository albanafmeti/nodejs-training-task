let bcrypt = require('bcrypt');
let User = require('../models/user');
let Helpers = require('../helpers');
let validate = require('../helpers').validate;
let Controller = require('./Controller');

class AuthController extends Controller {

    /**
     * Authenticate user.
     */
    authenticate(request, response) {
        const data = request.body;

        // Validate Email
        if (!validate('required', data.email)) {
            return Helpers.jsonResponse(response, false, null, 'Email is required.');
        }

        // Validate Password
        if (!validate('required', data.password)) {
            return Helpers.jsonResponse(response, false, null, 'Password is required.');
        }

        // Find User
        User.findOne({ 'email': data.email }, function (err, user) {

            if (err) {
                return Helpers.jsonResponse(response, false, user, 'Something went wrong.');
            }

            // Check if user exist and compare password.
            if (user && bcrypt.compareSync(data.password, user.password)) {
                user.generateNewToken((err, result) => {
                    if (result.ok) {

                        user.updateLastVisitAt((err, result) => { });
                        return Helpers.jsonResponse(response, true, { user: user }, 'Credentials match.');
                    }
                    return Helpers.jsonResponse(response, false, user, 'Something went wrong.');
                });
            } else {
                return Helpers.jsonResponse(response, false, null, 'Credentials do not match.');
            }
        });
    }
}

module.exports = new AuthController;