let User = require('../models/user');

class Controller {

    authorize(request, response, callback) {
        const auth_token = request.query._token;

        User.getAuthenticatedUser(auth_token, (err, user) => {
            if (err) {
                return Helpers.jsonResponse(response, false, null, 'Something went wrong.');
            }

            if (!user) {
                return Helpers.jsonResponse(response, false, null, 'You are not authorized.');
            }

            callback(user);
        });
    }
}

module.exports = Controller;